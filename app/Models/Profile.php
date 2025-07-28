<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model {
    use HasFactory;

	protected $table = 'profiles';
	protected $fillable = ['name', 'active'];


}
