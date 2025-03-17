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
        $list = Profile::all();
        return Inertia::render('dashboard/profiles/index', [
            'list' => $list,
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
        $data = Profile::find($id);
        return Inertia::render('dashboard/profiles/edit', [
            'data' => $data,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return redirect('dashboard/profiles');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('dashboard/profiles');
    }
}
