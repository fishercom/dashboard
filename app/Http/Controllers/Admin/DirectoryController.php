<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsDirectory;
use App\Models\CmsFileType;

class DirectoryController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = CmsDirectory::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/directories/index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        $fileTypes = CmsFileType::all();
        return Inertia::render('admin/directories/create', [
            'fileTypes' => $fileTypes,
        ]);
    }

    public function store(Request $request)
    {
        $profile = new CmsDirectory($request->all());
        $profile->save();
        return redirect('admin/directories');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsDirectory::find($id);
        $fileTypes = CmsFileType::all();
        return Inertia::render('admin/directories/edit', [
            'item' => $item,
            'fileTypes' => $fileTypes,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsDirectory::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/directories');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsDirectory::find($id);
		$item->delete();

        return redirect('admin/directories');
    }
}
