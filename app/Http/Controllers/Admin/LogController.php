<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\AdmLog;

class LogController extends Controller
{
    /**
     * Show the user's log settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');

        $items = AdmLog::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->paginate(15);
        return Inertia::render('admin/logs/index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the user's log settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = AdmLog::find($id);
        return Inertia::render('admin/logs/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's log settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = AdmLog::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/logs');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = AdmLog::find($id);
		$item->delete();

        return redirect('admin/logs');
    }
}
