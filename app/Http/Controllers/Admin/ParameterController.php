<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsLang;
use App\Models\CmsParameter;
use App\Models\CmsParameterLang;
use App\Models\CmsParameterGroup;

class ParameterController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = CmsParameter::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/parameters/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('admin/parameters/create');
    }

    public function store(Request $request)
    {
        $profile = new CmsParameter($request->all());
        $profile->save();
        return redirect('admin/parameters');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsParameter::find($id);
        return Inertia::render('admin/parameters/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsParameter::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/parameters');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsParameter::find($id);
		$item->delete();

        return redirect('admin/parameters');
    }
}
