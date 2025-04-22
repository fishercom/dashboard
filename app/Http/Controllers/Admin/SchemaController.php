<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsSchema;
use App\Models\CmsSchemaGroup;

class SchemaController extends Controller
{
    protected $group_id;

    public function __construct(Request $request)
    {
        $this->group_id = $request->get('group_id');
        if(!$this->group_id){
            $group = CmsSchemaGroup::select()
            ->where('active', true)
            ->orderBy('name', 'desc')
            ->first();
            if($group) $this->group_id = $group->id;
        }

        Inertia::share('group_id', $this->group_id);
    }

    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $s = $request->get('s');
        $group_id = $this->group_id;

        $groups = CmsSchemaGroup::select()
        ->where('active', true)
        ->orderBy('name', 'desc')
        ->get();

        $items = CmsSchema::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->where('group_id', $group_id)
        ->paginate(15);

        return Inertia::render('admin/schemas/index', [
            'items' => $items,
            'groups' => $groups
        ]);
    }

    public function create()
    {
      return Inertia::render('admin/schemas/create');
    }

    public function store(Request $request)
    {
        $profile = new CmsSchema($request->all());
        $profile->save();
        return redirect('admin/schemas');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsSchema::find($id);
        return Inertia::render('admin/schemas/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsSchema::find($id);
		$item->fill($request->all());
		$item->save();

        return redirect('admin/schemas');
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsSchema::find($id);
		$item->delete();

        return redirect('admin/schemas');
    }
}
