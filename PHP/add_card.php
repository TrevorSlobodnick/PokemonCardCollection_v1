<?php

    require_once("Database.php");

    $sql = "INSERT INTO `PokemonCards`(`card_id`, `image_url`, `name`, `code`, `type`, `hp`, `rarity`, `series`, `set`, `date_added`) 
            VALUES (:card_id, :image_url, :name, :code, :type, :hp, :rarity, :series, :set, NOW())";
    $hp = $_POST['hp'];
    if ($hp == null){
        $hp = 0;
    }
    $bindVal = ['card_id' => $_POST['card_id'], 'image_url' => $_POST['image_url'], 'name' => $_POST['name'], 'code' => $_POST['code'], 'type' => $_POST['type'], 'hp' => $hp, 'rarity' => $_POST['rarity'], 'series' => $_POST['series'], 'set' => $_POST['set']];

    $dbc = Database::getInstance();
    $result = $dbc->sqlQuery($sql, $bindVal);

    if($result){
        echo "Success";
    }
    else{
        echo "Failure";
    }
?>