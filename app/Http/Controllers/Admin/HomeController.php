<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\AdmMenu;
use App\Models\AdmModule;
use App\Models\AdmPermission;

class HomeController extends Controller
{
    /**
     * Show the main menu on sidebar dashboard.
     */
    public function index(Request $request): Response
    {
        $user=Auth::user();
		$profile=$user->profile;
		$menus = AdmMenu::select()->where('parent_id', null)->where('active', '1')->get();

		if($profile->id!=1){
		    $modules=AdmModule::select(['id', 'menu_id'])
		        ->whereIn('id', AdmEvent::select()
		            ->whereIn('id', AdmPermission::select()
		                ->where('profile_id', $profile->id)
		                ->pluck('event_id')
		            )
		            ->pluck('module_id')
		        )
		        ->where('active', '1');
		}
		else{
		    $modules=AdmModule::select()
		        ->where('active', '1');
		}

        return Inertia::render('admin/home/index', [
            'modules' => $modules,
            'menus' => $menus
        ]);
    }
}
