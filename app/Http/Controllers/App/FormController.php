<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Redirector;

use App\Models\CmsForm;
use App\Models\CmsFormField;
use App\Models\CmsRegister;
use App\Models\CmsRegisterField;
use App\Models\CmsNotify;

use DB;
use View;
use Mail;

class FormController extends Controller {

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
	}

	private function register_field($register, $key, $val){
		$field=CmsFormField::select('id')->Where('form_id', $register->form_id)->Where('alias', $key)->first();
		$rf = new CmsRegisterField;
		$rf->register_id = $register->id;
		$rf->field_id = $field->id;
		$rf->value = $val;
		$rf->save();
	}

	public function store(Request $request)
	{
    	$fields=$request->get('fields');
		$files =$request->file('files');

        $rules = ['captcha' => 'required|captcha'];
        $validator = Validator::make(['captcha'=>$request->get('g-recaptcha-response')], $rules);
	    if ($validator->fails())
        {
			return response()->json(['resp' => '0', 'msg' => 'El captcha ingresado es incorrecto.']);
        }

        $rules = ['form_id'=>'required', 'email'=>'required', 'acceptance'=>'required'];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
        {
			return response()->json(['resp' => '0', 'msg' => 'Algunos datos no se han ingresado correctamente. Por favor complételos.']);
        }

        $form=CmsForm::find($request->get('form_id'));
        if(!$form)
        {
			return response()->json(['resp' => '0', 'msg' => 'El formulario no se encuentra debidamente registrado, por favor intentelo mas tarde.']);
        }

		$register = new CmsRegister;
		$register->form_id = $form->id;
		$register->contact_id = $request->get('contact_id');
		$register->name = $request->get('name');
		$register->email = $request->get('email');
		$register->phone = $request->get('phone');
		$register->message = $request->get('message');
		$register->acceptance = $request->get('acceptance');
		$register->save();

		if($fields && count($fields)>0){
			foreach($fields as $key=>$val) {
				$this->register_field($register, $key, $val);
			}
		}

		if($files && count($files)>0){
			foreach($files as $file) {
				$rules = array('file' => 'required'); //'required|mimes:png,gif,jpeg,txt,pdf,doc'
				$validator = Validator::make(array('file'=> $file), $rules);
				if($validator->passes()){
					$path = base_path().'/public/userfiles/form/'.$form->id.'/';
					$extension = $file->getClientOriginalExtension(); // getting image extension
					$filename = uniqid().'.'.$extension; // renameing image

					if($file->move($path, $filename)){
						$this->register_field($register, key($files), $filename);//save register in DB
					}
				}
			}
		}

		//Send mail
		$notifies=CmsNotify::select()
			->where('form_id', $form->id)
			->where('active', '1')
			->get();

		foreach ($notifies as $notify) {
	        Mail::send('emails.contacto', ['register' => $register], function ($m) use ($notify) {
	            $m->to($notify->user->email)->subject('contrato de Contacto');
	            if(!empty($notify->recipients)) $m->cc(explode(',', $notify->recipients));
	        });
        }

		return response()->json(['resp' => '1', 'msg' => 'Los datos se registraron correctamente']);
	}

}
