<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsForm;
use App\Models\CmsNotify;
use App\Models\User;

class NotifyController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = CmsNotify::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/notifies/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        $forms = CmsForm::all();
        $users = User::all();
        return Inertia::render('admin/notifies/create', [
            'forms' => $forms,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $profile = new CmsNotify($request->all());
        $profile->save();
        return redirect('admin/notifies');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsNotify::find($id);
        $forms = CmsForm::all();
        $users = User::all();
        return Inertia::render('admin/notifies/edit', [
            'item' => $item,
            'forms' => $forms,
            'users' => $users,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsNotify::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/notifies');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsNotify::find($id);
		$item->delete();

        return redirect('admin/notifies');
    }
}
