<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UserUpdateRequest;
use App\Models\Profile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the user's User settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $profiles = Profile::all();

        $items = User::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('dashboard/users/index', [
            'items' => $items,
            'profiles' => $profiles,
        ]);
    }

    public function create()
    {
        $profiles = Profile::all();

        return Inertia::render('dashboard/users/create',[
            'profiles' => $profiles,
        ]);
    }

    public function store(Request $request)
    {
        $User = new User($request->all());
        $User->save();
        return redirect('dashboard/users');
    }

    /**
     * Show the user's User settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = User::find($id);
        $profiles = Profile::all();

        return Inertia::render('dashboard/users/edit', [
            'item' => $item,
            'profiles' => $profiles,
        ]);
    }

    /**
     * Update the user's User settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = User::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('dashboard/users');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = User::find($id);
		$item->delete();

        return redirect('dashboard/users');
    }
}
