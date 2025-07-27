<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsNotify extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_notifies';
	protected $fillable = ['form_id', 'user_id', 'recipients', 'active'];

    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }

}
