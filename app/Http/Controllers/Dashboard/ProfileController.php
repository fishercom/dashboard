<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Profile;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $items = Profile::paginate(15);
        return Inertia::render('dashboard/profiles/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('dashboard/profiles/create');
    }

    public function store(Request $request)
    {
        $profile = new Profile($request->all());
        $profile->save();
        return redirect('dashboard/profiles');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = Profile::find($id);
        return Inertia::render('dashboard/profiles/edit', [
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

        return redirect('dashboard/profiles');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = Profile::find($id);
		$item->delete();

        return redirect('dashboard/profiles');
    }
}
