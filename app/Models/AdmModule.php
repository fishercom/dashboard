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
	protected $fillable = ['name', 'title', 'description', 'url', 'route', 'icon', 'visible'];

    public function events()
    {
        return $this->hasMany(AdmEvent::class, 'module_id', 'id');
    }

}
