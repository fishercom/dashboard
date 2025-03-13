<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class CrmCliente extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "tipo_persona", "tipo_documento", "nro_documento", "nombre", "apellido_paterno", "apellido_materno", "direccion", "departamento_id", "provincia_id", "distrito_id", "telefono", "celular", "email", "username", "password", "acepto_terminos", "estado",
    ];

    protected $casts = [
        'documentos' => 'array',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function departamento()
    {
        return $this->hasOne('App\Models\UbgDepartment', 'id', 'departamento_id');
    }

    public function provincia()
    {
        return $this->hasOne('App\Models\UbgProvince', 'id', 'provincia_id');
    }

    public function distrito()
    {
        return $this->hasOne('App\Models\UbgDistrict', 'id', 'distrito_id');
    }

    public function setPasswordAttribute($value)
    {
        if(!empty($value)){
            $this->attributes['password'] = \Hash::make($value);
        }

        return $this->attributes['password'];
    }

    public function findForPassport($identifier) {
        return $this->where('email', $identifier)->first();
    }

}
