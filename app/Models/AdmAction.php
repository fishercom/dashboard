<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmAction extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'adm_actions';
	protected $fillable = ['name', 'write_log'];

}