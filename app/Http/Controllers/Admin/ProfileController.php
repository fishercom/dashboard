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
        $modules = \App\Models\AdmModule::with('events.action')->where('visible', true)->orderBy('name')->get();
        return Inertia::render('admin/profiles/create', [
            'modules' => $modules,
        ]);
    }

    public function store(Request $request)
    {
        $profile = new Profile($request->all());
        $profile->save();

        if ($request->has('permissions')) {
            foreach ($request->input('permissions') as $event_id) {
                AdmPermission::create([
                    'profile_id' => $profile->id,
                    'event_id' => $event_id,
                ]);
            }
        }

        return redirect('admin/profiles');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = Profile::find($id);
        $modules = \App\Models\AdmModule::with('events.action')->where('visible', true)->orderBy('name')->get();
        $item->permissions = AdmPermission::where('profile_id', $id)->pluck('event_id')->toArray();

        return Inertia::render('admin/profiles/edit', [
            'item' => $item,
            'modules' => $modules,
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

        AdmPermission::where('profile_id', $id)->delete();

        if ($request->has('permissions')) {
            foreach ($request->input('permissions') as $event_id) {
                AdmPermission::create([
                    'profile_id' => $id,
                    'event_id' => $event_id,
                ]);
            }
        }

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
