<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\AdmMenu;
use App\Models\AdmModule;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $groups = AdmMenu::select()
        ->where('visible', true)
        ->orderBy('position', 'asc')
        ->get();

        $adm_menu = [];
        foreach($groups as $group){
            $modules = $group->modules;

            $items = [];
            foreach($modules as $module){
                $items[] = ['id'=>$module->id, 'title'=>$module->name, 'description'=>$module->description, 'url'=>$module->url, 'icon'=>$module->icon];
            }
            $adm_menu[] = ['id'=>$group->id, 'title' => $group->name, 'items'=>$items];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'adm_menu' => $adm_menu
        ];
    }
}
