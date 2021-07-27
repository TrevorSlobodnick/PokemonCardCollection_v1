<?php

require_once("Database.php");
require_once("PokemonCard.php");

    $sql = "SELECT * FROM `PokemonCards`";

    $dbc = Database::getInstance();
    $result = $dbc->fetchArray($sql);

    echo json_encode($result);

?>