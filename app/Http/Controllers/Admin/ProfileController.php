<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Profile;
use App\Models\AdmPermission;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = Profile::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/profiles/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('admin/profiles/create');
    }

    public function store(Request $request)
    {
        $profile = new Profile($request->all());
        $profile->save();
        return redirect('admin/profiles');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = Profile::find($id);
        return Inertia::render('admin/profiles/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = Profile::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/profiles');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = Profile::find($id);
		$item->delete();

        return redirect('admin/profiles');
    }
}
