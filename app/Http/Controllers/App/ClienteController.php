<?php
namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password as PasswordRoules;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;

use App\Models\CrmCliente;
use App\Models\CrmDocumento;
use App\Models\CrmNotify;
use App\Models\User;

use Peru\Jne\DniFactory;
use Peru\Sunat\RucFactory;

use App\Util\RegisterLog;
use App\Rules\ReCaptcha;
use App\Util\Transl;
use App\Util\Notifications;

use Config;
use DB;
use Exception;
use Log;
use Mail;

class ClienteController extends AppController {

	public $estados;
	public $oficial;

	/*
	|--------------------------------------------------------------------------
	| Front Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/
	public function __construct()
	{
		//$this->middleware('guest');

		//date_default_timezone_set('America/Lima');
		//setlocale(LC_TIME, "es_PE");
		$this->estados = Config::get('constants.estados');
		$this->oficial = User::where('profile_id', Config::get('constants.oficial_etica_id'))
                        ->where('default', '1')
                        ->first();
	}

	public function login(Request $request){

		$username = $request->get('username');
		$password = $request->get('password');

        if(Auth::guard('cliente')->attempt($request->only('email','password'))){
            return $this->response(Auth::guard('cliente')->user());
        }
		else{
            return $this->error('Los datos ingresados no coinciden');
		}

        $cliente = CrmCliente::select()->where('username', $username)->where('password', $password)->first();

		if($cliente!=null){
			session(['cliente' => $cliente]);
            return $this->response($cliente);
		}
		else{
            return $this->error('Los datos ingresados no coinciden');
		}
	}

    public function persona(Request $request){
        $tipo_documento = $request->get('tipo_documento');
		$nro_documento = $request->get('nro_documento');
        $persona = $this->get_persona($tipo_documento, $nro_documento);

        return $this->response($persona);
    }

    public function detalle_list(){
        $cliente = auth('cliente')->user();
		$detalle = CrmDocumento::select()->where('cliente_id', $cliente->id)->get();
        foreach($detalle as $item){
            $item['documentos'] = $item->anexos;
            $item['estado_name'] = $this->estados[$item->estado];
            $item['author_name'] = $item->autor? $item->autor->name: 'Registrante';
        }

        return $this->response($detalle);
    }

	public function store(Request $request)
	{
        if (Validator::make($request->all(), [
            'username'=>'unique:crm_clientes,username'
        ])->fails()) {
            return $this->error('El Nombre de Usuario ya está registrado');
        }

        if (Validator::make($request->all(), [
            'email'=>'unique:crm_clientes,email'
        ])->fails()) {
            return $this->error('El Email del Usuario ya está registrado');
        }

        if (Validator::make($request->all(), [
            'password' => [PasswordRoules::min(6)
            ->letters()
            //->mixedCase()
            ->numbers()
            ]
        ])->fails()) {
            return $this->error('La Contraseña debe contener al menos 6 caracteres (letras y números)');
        }
        if (Validator::make($request->all(), [
            'confirm_password'=>'same:password'
        ])->fails()) {
            return $this->error('La Contraseña no coincide');
        }

        $validator = Validator::make($request->all(), ['recaptcha'=> new ReCaptcha()]);
		if ($validator->fails())
		{
            return $this->error('Verificación Captcha: Por favor vuelva enviar los datos!');
		}

        $rules = [
                    'tipo_persona'=>'required',
                    'tipo_documento'=>'required',
                    'nro_documento'=>'required',
                    'nombre'=>'required',
                    //'apellido_paterno'=>'required',
                    //'apellido_materno'=>'required',
                    'direccion'=>'required',
                    'email'=>'required',
                    'username'=>'required',
                    'password'=>'required',
                    'recaptcha'=>'required',
                    'acepto_terminos'=>'required'
                ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
        {
            return $this->error('Algunos datos no se han ingresado correctamente. Por favor complételos.');
        }

        $tipo_documento = $request->get('tipo_documento');
		$nro_documento = $request->get('nro_documento');

        if(!$this->get_persona($tipo_documento, $nro_documento)){
           return $this->error('El documento de Identidad ('.$tipo_documento.') no es válido.');
        }

		//$files =$request->get('documentos');
		$lang_id=$request->get('lang_id');
		Transl::prepare($lang_id);

		$cliente = new CrmCliente;
		$cliente->tipo_persona = $request->get('tipo_persona');
		$cliente->tipo_documento = $request->get('tipo_documento');
		$cliente->nro_documento = $request->get('nro_documento');

        $cliente->nombre = $request->get('nombre');
        $cliente->apellido_paterno = $request->get('apellido_paterno');
        $cliente->apellido_materno = $request->get('apellido_materno');
        $cliente->direccion = $request->get('direccion');
        $cliente->departamento_id = $request->get('departamento_id');
        $cliente->provincia_id = $request->get('provincia_id');
        $cliente->distrito_id = $request->get('distrito_id');
        $cliente->telefono = $request->get('telefono');
        $cliente->celular = $request->get('celular');

        $cliente->email = $request->get('email');
		$cliente->username = $request->get('username');
		$cliente->password = $request->get('password');

        $cliente->acepto_terminos = $request->get('acepto_terminos');
        $cliente->estado = 'ACTIVO';

        $cliente->save();

        $cliente->token = $cliente->createToken('MyApp')->accessToken;

		Notifications::send_cliente($cliente);

        return $this->response($cliente);
	}

	public function update(Request $request)
	{
        $validator = Validator::make($request->all(), ['recaptcha'=> new ReCaptcha()]);
		if ($validator->fails())
		{
            return $this->error('Verificación Captcha: Por favor vuelva enviar los datos!');
		}

        $rules = ['comentario'=>'required', 'recaptcha'=>'required'];
		$validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
        {
            return $this->error('Algunos datos no se han ingresado correctamente. Por favor complételos.');
        }

		$files =$request->get('documentos');
		$lang_id=$request->get('lang_id');
		Transl::prepare($lang_id);

		$cliente = auth('cliente')->user();

		//Notifications::send_cliente($cliente);

		return $this->response($cliente);
	}

    private function get_persona($tipo_documento, $nro_documento){

        if($tipo_documento=='RUC'){
            return get_persona_ruc($nro_documento);
        }
        else{
            return get_persona_dni($nro_documento);
        }
        /*
        if($tipo_documento=='RUC'){
            $factory = new RucFactory();
            $cs = $factory->create();
        }
        else{
            $factory = new DniFactory();
            $cs = $factory->create();
        }

        return $cs->get($nro_documento);
        */
    }
}
