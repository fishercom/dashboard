<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsRegister extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_registers';
	protected $fillable = ['form_id', 'contact_id', 'name', 'email', 'phone', 'message', 'acceptance', 'review', 'review_date'];


    public function form()
    {
        return $this->hasOne('App\Models\CmsForm', 'id', 'form_id');
    }

    public function contact()
    {
        return $this->hasOne('App\Models\CmsParameter', 'id', 'contact_id');
    }

}
