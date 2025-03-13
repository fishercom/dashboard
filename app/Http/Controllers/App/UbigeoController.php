<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Log;

use App\Models\UbgDepartment;
use App\Models\UbgProvince;
use App\Models\UbgDistrict;
use App\Models\User;

use DB;
use View;
use Auth;

class UbigeoController extends Controller
{

	public function department_list()
	{
		$list = UbgDepartment::select('name', 'id')
            ->get();

		return response()->json($list);
	}

	public function province_list(Request $request)
	{
		$list = UbgProvince::select('name', 'id')
            ->where('department_id', $request->department_id)
            ->get();

		return response()->json($list);
	}

	public function district_list(Request $request)
	{
		$list = UbgDistrict::select('name', 'id')
            ->where('province_id', $request->province_id)
            ->get();

		return response()->json($list);
	}

}
