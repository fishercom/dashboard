<?php
namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRoules;

use App\Models\CrmCliente;
use App\Models\CrmClienteReset;
use App\Util\Notifications;

use Auth;
use DB;
use Log;
use Carbon\Carbon;
use Validator;

class AuthController extends AppController
{
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function cliente(Request $request) {

        return response()->json(auth('cliente'), 200);
        return $this->response(auth('cliente'), 'Cliente Information.');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return $this->error('Datos de acceso insuficientes');
        }

        $cliente = CrmCliente::select()->where('username', $request->username)->first();
        if ($cliente) {
            if (Hash::check($request->password, $cliente->password)) {
                $cliente->token = $cliente->createToken('MyApp')->accessToken;
                return $this->response($cliente);
            }
        }

        return $this->error('No coincide El Nombre de Usuario o Contraseña');
    }

    public function forgot(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required:email',
        ]);
        if ($validator->fails())
        {
            return $this->error('Datos insuficientes');
        }

        $cliente = CrmCliente::select()->where('email', $request->email)->first();
        if ($cliente) {

            $cliente_reset = new CrmClienteReset();
            $cliente_reset->cliente_id = $cliente->id;
            $cliente_reset->token = Hash::make($cliente->id);
            $cliente_reset->expires = Carbon::now()->addHours(2);
            $cliente_reset->save();

            $link = url('/cliente_reset/?token='.$cliente_reset->token.'&username='.$cliente->username);

            $send_link = Notifications::send_cliente_reset($cliente, $link);

            if($send_link)
                return $this->response(true);
            else
                return $this->error('Error al generar en enlace');
        }

        return $this->error('El email ingresado no coincide');
    }

    public function logout()
    {
        auth('cliente')->tokens->each(function ($token, $key) {
            $token->delete();
        });

        //return response()->json('Logged out successfully', 200);
        return $this->response(null, 'Logged out successfully');
    }

    public function reset_password(Request $request){
        if (Validator::make($request->all(), [
            'token' => 'required',
            'username' => 'required',
            'password' => 'required',
            'password_confirm' => 'required',
        ])->fails())
        {
            return $this->error('Parámetros insuficientes');
        }
        if (Validator::make($request->all(), [
            'password' => [PasswordRoules::min(6)
            ->letters()
            ->numbers()
            ]
        ])->fails()) {
            return $this->error('La contraseña debe contener al menos 6 caracteres (letras y números)');
        }
        if (Validator::make($request->all(), [
            'password_confirm'=>'same:password'
        ])->fails()) {
            return $this->error('Las contraseñas no coinciden');
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'password_confirm' => 'required',
        ]);
        if ($validator->fails())
        {
            return $this->error('Datos insuficientes');
        }

        $cliente_reset = CrmClienteReset::select()
                            ->where('token', $request->token)
                            ->where('expires', '>', Carbon::now()->format('Y-m-d H:i:s'))
                            ->first();
        if ($cliente_reset) {

            Log::info($cliente_reset->expires);

            $cliente = $cliente_reset->cliente;
            $cliente->password = $request->get('password');
            $cliente->save();

            $cliente_reset->delete();

            return $this->response(true);
        }

        return $this->error('La solicitud ha caducado o ya no existe');
    }

}
