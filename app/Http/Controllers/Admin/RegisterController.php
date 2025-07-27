<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsRegister;
use App\Models\CmsRegisterField;
use App\Models\CmsForm;

class RegisterController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = CmsRegister::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/registers/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('admin/registers/create');
    }

    public function store(Request $request)
    {
        $profile = new CmsRegister($request->all());
        $profile->save();
        return redirect('admin/registers');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsRegister::find($id);
        return Inertia::render('admin/registers/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsRegister::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/registers');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsRegister::find($id);
		$item->delete();

        return redirect('admin/registers');
    }
}
