<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\CmsArticle;
use App\Models\CmsLang;
use App\Models\CmsSchema;

class ArticleController extends Controller
{
    protected $lang_id, $parent_id;

    public function __construct(Request $request)
    {
        $this->lang_id = $request->get('lang_id');
        $this->parent_id = $request->get('parent_id');
        if(!$this->lang_id){
            $lang = CmsLang::select()
            ->where('active', true)
            ->orderBy('name', 'desc')
            ->first();
            if($lang) $this->lang_id = $lang->id;
        }

        Inertia::share('lang_id', $this->lang_id);
        Inertia::share('parent_id', $this->parent_id);
    }

    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $lang_id = $this->lang_id;
        $parent_id = $this->parent_id;
        $s = $request->get('s');

        $items = CmsArticle::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->where('lang_id', $lang_id)
        ->where('parent_id', $parent_id)
        ->paginate(15);

        $parent = CmsSchema::find($parent_id);

        return Inertia::render('admin/articles/index', [
            'items' => $items,
            'parent' => $parent,
        ]);
    }

    public function create(Request $request)
    {
      $schemaId = (int) $request->get('schema_id', 1);
      $schema = CmsSchema::find($schemaId);

      $args = [
        'id' => null,
        'lang_id' => $this->lang_id,
        'parent_id' => $this->parent_id,
        'schema_id' => $schemaId,
        'title' => '',
        'metadata' => new \stdClass(),
        'slug' => '',
        'active' => true,
      ];

      return Inertia::render('admin/articles/create', [
        'item' => $args,
        'schema' => $schema,
      ]);
    }

    public function store(Request $request)
    {
        $profile = new CmsArticle($request->all());
        $profile->save();

        $args = [
            'lang_id' => $this->lang_id,
            'parent_id' => $this->parent_id
        ];

        return redirect()->route('articles.index', $args);
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit($id, Request $request): Response
    {
        $item = CmsArticle::with('schema')->find($id);
        return Inertia::render('admin/articles/edit', [
            'item' => $item,
            'schema' => $item?->schema,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update($id, Request $request): RedirectResponse
    {
        $item = CmsArticle::find($id);
		$item->fill($request->all());
		$item->save();

        $args = [
            'lang_id' => $this->lang_id,
            'parent_id' => $this->parent_id
        ];

        return redirect()->route('articles.index', $args);
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id, Request $request): RedirectResponse
    {
        $item = CmsArticle::find($id);
		$item->delete();

        return redirect('admin/articles');
    }
}
