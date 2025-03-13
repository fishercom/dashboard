<?php
namespace App\Http\Controllers\App;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password as PasswordRoules;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Validator;

use App\Models\CrmCliente;
use App\Models\CrmDocumento;
use App\Models\CrmDocumentoAnexo;
use App\Models\CrmNotify;
use App\Models\User;

use App\Util\RegisterLog;
use App\Rules\ReCaptcha;
use App\Util\Transl;
use App\Util\Notifications;

use Config;
use DB;
use Exception;
use Log;
use Mail;

class DocumentoController extends AppController {

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

    public function list(){
        $cliente = auth('cliente')->user();
		$documentos = CrmDocumento::select()->where('cliente_id', $cliente->id)->get();
        foreach($documentos as $item){
            $item['documentos'] = $item->anexos;
            $item['tipo_documento'] = $item->tipo_documento;
            $item['estado_name'] = $this->estados[$item->estado];
            $item['author_name'] = $item->autor? $item->autor->name: 'Registrante';
        }

        return $this->response($documentos);
    }

	public function store(Request $request)
	{
        $rules = [
                    'tipo_documento_id'=>'required',
                    'nro_documento'=>'required',
                    'fecha_documento'=>'required',
                    'asunto'=>'required',
                    'descripcion'=>'required',
                    'referencias'=>'required',
					'documento'=>'required'
                ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
        {
            return $this->error('Algunos datos no se han ingresado correctamente. Por favor complételos.');
        }

		$cliente = auth('cliente')->user();
		//Log::info($cliente);

		$_documento = $request->get('documento');
		$_anexos = $request->get('documentos');
        //Log::info($documento['file']);

		try{
            DB::beginTransaction();
			$documento = new CrmDocumento;
			$documento->cliente_id=$cliente->id;
			$documento->tipo_documento_id=$request->get('tipo_documento_id');
			$documento->nro_documento=$request->get('nro_documento');
			$documento->fecha_documento=$request->get('fecha_documento');
			$documento->asunto=$request->get('asunto');
			$documento->descripcion=$request->get('descripcion');
			$documento->referencias=$request->get('referencias');
			$documento->observaciones=$request->get('observaciones');
			$documento->documento=upload_file_data($cliente->id, $_documento['name'], $_documento['file'], 'cliente/documentos');
			//$documento->documentos=$this->upload_anexos($cliente->id, $_anexos);
			$documento->estado = 'EN_PROCESO';
            $documento->codigo_interno = make_codigo_interno($cliente);
			$documento->save();

            if(is_array($_anexos)){
                foreach($_anexos as $item) {
                    if(!isset($item['documento']['name']) || !isset($item['documento']['file'])) continue;
                    $documento_anexo = new CrmDocumentoAnexo;
                    $documento_anexo->documento_id = $documento->id;
                    $documento_anexo->documento = upload_file_data($cliente->id, $item['documento']['name'], $item['documento']['file'], 'cliente/documentos');
                    $documento_anexo->tipo_documento_id=$item['tipo_documento_id'];
                    $documento_anexo->nro_documento = $item['nro_documento'];
                    $documento_anexo->observaciones = $item['observaciones'];
                    $documento_anexo->save();
                }
            }
            DB::commit();
        }
		catch (\Exception $e){
            DB::rollback();
            return $this->error($e->getMessage());
		}

		Notifications::send_cliente_documento($cliente, $documento);

        return $this->response($documento);
	}

	public function upload_anexos($cliente_id, $items){

		$documentos = array();
		if(is_array($items)){
			foreach($items as $item) {
                if(!isset($item['documento']['name']) || !isset($item['documento']['file'])) continue;
                $item['documento'] = upload_file_data($cliente_id, $item['documento']['name'], $item['documento']['file'], 'cliente/documentos');
                $documentos[] = $item;
            }
		}

		return $documentos;
	}


}
