<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Redirector;

use App\Models\CmsParameter;


use DB;
use View;

class ParameterController extends Controller {

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

    function list(Request $request){
        $parent_id = $request->parent_id;
        $list = CmsParameter::select('cms_parameters.name', 'cms_parameters.id', 'cms_parameters.metadata', 'cms_parameters_group.alias')
            ->leftjoin('cms_parameters_group', function($join){
                $join->on('cms_parameters_group.id', '=', 'cms_parameters.group_id');
            })
            ->where('cms_parameters.active', '1')
            ->where(function($query) use($parent_id){
                if($parent_id) $query->where('cms_parameters.parent_id', $parent_id);
            })
            ->orderBy('cms_parameters.position')
            ->get();

        return response()->json($list);

    }

    function info($id, Request $request){

        $item = CmsParameter::find($id);
        $info = [
                    'id'=>$item->id,
                    'name'=>$item->name,
                    'color'=>get_field($item->metadata, 'color'),
                    'definicion'=>get_field($item->metadata, 'definicion'),
                ];

        return response()->json($info);

    }


}
