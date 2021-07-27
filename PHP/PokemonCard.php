<?php

class PokemonCard{
    public $id;
    public $cardId;
    public $imageUrl;
    public $name;
    public $code;
    public $type;
    public $hp;
    public $rarity;
    public $series;
    public $set;
    public $date_added;

    public function __construct($id, $cardId, $imageUrl, $name, $code, $type, $hp, $rarity, $series, $set, $date_added){
        $this->id = $id;
        $this->cardId = $cardId;
        $this->imageUrl = $imageUrl;
        $this->name = $name;
        $this->code = $code;
        $this->type = $type;
        $this->hp = $hp;
        $this->rarity = $rarity;
        $this->series = $series;
        $this->set = $set;
        $this->date_added = $date_added;
    }


}

?>