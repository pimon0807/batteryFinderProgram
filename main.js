// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

//console.log(battery);
//console.log(camera);

let target = document.getElementById("target");
target.classList.add("h-100", "bg-secondary", "py-4");

//タイトルの作成
let title = document.createElement("div");
title.classList.add("w-100", "bg-primary",  "titleFont", "py-3");
title.innerText = "Battery Finder Program";
target.append(title);

//step全体の作成
let inputArea = document.createElement("div");
inputArea.classList.add("h-100", "bg-light", "p-3");

//step1の作成
let step1 = document.createElement("div");
step1.classList.add("d-flex", "flex-column");
step1.innerHTML = "step1: Select your brand";

//step1で選択できるブランドを絞る
let brandList = camera.reduce((acc, curr) => (acc.indexOf(curr.brand) !== -1) ? acc : [...acc, curr.brand], []);
let brandName = createSelectList(brandList, 1);

//step1を選択するとそれ以下のstepの選択に連動する
//step1を選択すると発生するイベント
brandName.addEventListener("change", function(){
    initialDisabled("step1");
    displayArea.innerHTML = "";
    electricPower.value = 0;
    electricPower.disabled = true;

    //カメラのブランドから重複なしのモデル名のリストを作成
    let modelList = camera.reduce((acc, curr) => (curr.brand !== this.value) ? acc : [...acc, curr.model], []);
    modelName = createSelectList(modelList, 2);
    document.getElementById("2").replaceWith(modelName);

    //ste2を選択すると発生するイベント
    modelName.addEventListener("change", function(){
    initialDisabled("step2");
    electricPower.value = 0;
    displayArea.innerHTML = "";

    //上stepで選択したモデルの消費電力
    let powerConsumptionWh = camera.find(i => i.model === this.value).powerConsumptionWh;

    //終止電圧時の最大放電電力がカメラの消費電力を上回るリストの作成
    let batteryList = battery.filter(i => (i.maxDraw * i.endVoltage) >= powerConsumptionWh);

    //絞ったバッテリーのリストから名前を抜き取り、アルファベット順にソートしたリストの作成
    let batteryNameList = batteryList.map(i => i.batteryName).sort();

    //バッテリーリストの各要素から画面上に表示するカードの作成
    for(let j=0; j<batteryNameList.length; j++){
        createBattryCard(powerConsumptionWh, batteryList, batteryNameList, j);
    }
    electricPower.disabled = false;

    //ste3を入力すると発生するイベント
    electricPower.addEventListener("input", function(){

        //アクセサリ増加分を考慮した終止電圧時の最大放電電力がカメラの消費電力を上回るリストの作成
        newBatteryList = batteryList.filter(i => (i.maxDraw * i.endVoltage) >= powerConsumptionWh + parseInt(electricPower.value));
            newBatteryNameList = newBatteryList.map(i => i.batteryName).sort();
            displayArea.innerHTML = "";
        for(let k=0; k<newBatteryNameList.length; k++){
            createBattryCard(powerConsumptionWh+parseInt(electricPower.value), newBatteryList, newBatteryNameList, k);
        }
    })
    })
})
step1.append(brandName);
inputArea.append(step1);

//step2の作成
let step2 = document.createElement("div");
step2.classList.add("d-flex", "flex-column");
step2.innerHTML = "step2: Select your Model";

//step2で選択できるモデルを絞る
let modelName = createSelectList([], 2);
step2.append(modelName);
inputArea.append(step2);

//step3の作成
let step3 = document.createElement("div");
step3.classList.add("d-flex", "flex-column");
step3.innerHTML = "step3: Input Accessory Power Consumption";

//textAreaの初期値及びスタイルを設定
let styleDiv = document.createElement("div");
let electricPower = document.createElement("input");
electricPower.type = "number";
electricPower.max = 100;
electricPower.min = 0;
electricPower.id = "Power";
electricPower.placeholder = "0~100 W";
electricPower.classList.add("w-25", "m-2");
electricPower.disabled = true;
styleDiv.append(electricPower);
styleDiv.append("W");
step3.append(styleDiv);
inputArea.append(step3);

//step4の作成
let step4 = document.createElement("div");
step4.classList.add("d-flex", "flex-column");
step4.innerHTML = "step4: Choose Your Battery";
let displayArea = document.createElement("div");
displayArea.classList.add("d-flex", "flex-column");
step4.append(displayArea);
inputArea.append(step4);

target.append(inputArea);
//console.log(target);

//プルダウンリストを作成する関数
function createSelectList(list, step) {
    let parent = document.createElement("select");
    parent.classList.add("m-2");
    parent.id = step;
    let initial = document.createElement("option");
    initial.id = "step" + step;
    if(step === 2){
        initial.text = "Select Model!";
    }else{
        initial.text = "Select brand!";
    }
    parent.append(initial);
    for(let i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i];
        option.text = list[i];
        parent.append(option);
    }
    return parent;
}

//disableを変更する関数
function initialDisabled(id){
    return document.getElementById(id).setAttribute("disabled", true);
}

//入力値を小数点第2位で切り捨てて、小数点以下1桁で返す関数
function rounding(n){
    return (Math.floor(n * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(1);
}

//バッテリー名と使用可能時間を表示するcardを作成する関数
function createBattryCard(powerConsumptionWh, batteryList ,batteryNameList, n){
    let card = document.createElement("div");
    card.classList.add("cardStyle");
    let batteryName = document.createElement("div");
    let batteryPowerConsumption = batteryList.find(i => i.batteryName === batteryNameList[n]).capacityAh * batteryList.find(i => i.batteryName === batteryNameList[n]).voltage;
    let usableTime = document.createElement("div");
    usableTime.innerText = "Estimated " + rounding(batteryPowerConsumption / powerConsumptionWh) + " hours on selected setup";
    batteryName.innerHTML = batteryNameList[n];
    card.append(batteryName);
    card.append(usableTime);
    displayArea.append(card);
}