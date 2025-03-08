<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$login = $_GET['login'];
$spreadsheet = IOFactory::load('data.xlsx');
$sheet = $spreadsheet->getActiveSheet();
$data = [];

foreach ($sheet->getRowIterator() as $row) {
    $cellIterator = $row->getCellIterator();
    $cellIterator->setIterateOnlyExistingCells(false);
    $rowData = [];
    foreach ($cellIterator as $cell) {
        $rowData[] = $cell->getValue();
    }
    if ($rowData[1] === $login) {
        $etitHFC = ($rowData[5] == 1 && $rowData[6] == 1) ? 'Ganhou' : ($rowData[5] == 1 && $rowData[6] == 0) ? 'Perdeu' : 'Ignorado';
        $etitGPON = ($rowData[7] == 1 && $rowData[8] == 1) ? 'Ganhou' : ($rowData[7] == 1 && $rowData[8] == 0) ? 'Perdeu' : 'Ignorado';
        $data[] = [
            'outage' => $rowData[2],
            'tempo' => $rowData[4],
            'etitHFC' => $etitHFC,
            'etitGPON' => $etitGPON
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($data);
?>
