<?php

    require_once("DB_CREDS.php");

    class Database{
        private static $instance;
        private $conn;

        private function __construct(){
            $this->conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME , DB_USER , DB_PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        public static function getInstance(){
            if (!self::$instance){
                self::$instance = new self();
            }
            return self::$instance;
        }

        public function getConnection(){
            return $this->conn;
        }

        public function sqlQuery($sql, $bindVal = null, $returnStatement = false){
            $statement = $this->conn->prepare($sql);
            if (is_array($bindVal)){
                $result = $statement->execute($bindVal);
            }
            else{
                $result = $statement->execute();
            }
            if ($returnStatement){
                return $statement;
            }
            return $result;
        }


        public function fetchArray($sql, $bindVal = null){
            $result = $this->sqlQuery($sql, $bindVal, true);
            if ($result->rowCount() == 0) {
                return false;
            }
            else{
                return $result->fetchAll(PDO::FETCH_ASSOC);
            }
        }
    }

?>