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

class LangController extends Controller
{
    /**
     * Show the user's lang settings page.
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
        return Inertia::render('admin/langs/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
      return Inertia::render('admin/langs/create');
    }

    public function store(Request $request)
    {
        $lang = new CmsLang($request->all());
        $lang->save();
        return redirect('admin/langs');
    }

    /**
     * Show the user's lang settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsLang::find($id);
        return Inertia::render('admin/langs/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's lang settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsLang::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/langs');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsLang::find($id);
		$item->delete();

        return redirect('admin/langs');
    }
}
