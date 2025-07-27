<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmModule extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'adm_modules';
	protected $fillable = ['name', 'title', 'url', 'icon', 'visible'];

    public function events()
    {
        return $this->hasMany('App\Models\AdmEvent', 'module_id', 'id');
    }

}
