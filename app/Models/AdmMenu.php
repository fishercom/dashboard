<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmMenu extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'adm_menus';
    protected $fillable = ['name', 'active'];

    public function children()
    {
        return $this->hasMany('App\Models\AdmMenu', 'parent_id', 'id')
        	->where('active', '1')
        	->orderBy('position');
    }

    public function modules()
    {
        return $this->hasMany('App\Models\AdmModule', 'menu_id', 'id')
        	->where('active', '1')
        	->orderBy('position');
    }

}
