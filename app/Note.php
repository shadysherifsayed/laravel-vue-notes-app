<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'name', 'user_id', 'slug',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDescriptionAttribute($description)
    {
        return htmlspecialchars_decode($description);
    }
    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->toFormattedDateString();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
