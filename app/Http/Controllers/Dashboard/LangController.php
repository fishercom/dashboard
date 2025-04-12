<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\CmsLangUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsLang;

class LangController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = CmsLang::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('dashboard/langs/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('dashboard/langs/create');
    }

    public function store(Request $request)
    {
        $profile = new CmsLang($request->all());
        $profile->save();
        return redirect('dashboard/langs');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsLang::find($id);
        return Inertia::render('dashboard/langs/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsLang::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('dashboard/langs');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsLang::find($id);
		$item->delete();

        return redirect('dashboard/langs');
    }
}
