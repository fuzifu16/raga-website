/* ===== RAGA 瑞基 - Product Data ===== */
const PRODUCTS = {
  "ra10": {
    id: "ra10",
    name: "RAIII7A / RAIII11A / RAIII13A",
    image: "images/RAIII7A.png",
    category: "多回转",
    tag: "智能型",
    desc: "RAIII7A/RAIII11A/RAIII13A 智能型多回转电动执行机构，结构紧凑，体积小、重量轻，适用于中小口径阀门及闸阀、截止阀等的控制。采用非侵入式设定方式，无需打开电气箱盖即可完成所有调试。",
    specs: [
      ["型号", "RAIII7A / RAIII11A / RAIII13A"],
      ["输出转矩", "34 ~ 108 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 / 72 / 96 / 144 r/min"],
      ["电机功率", "0.05 ~ 4.80 kW (380VAC)"],
      ["电机电流", "1.4 ~ 16.5 A (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC/50Hz)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"],
      ["重复性误差", "≤ 1%"]
    ],
    downloads: [
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "ra40": {
    id: "ra40",
    name: "RAIII14A / RAIII15A / RAIII16A",
    image: "images/hero-product.png",
    category: "多回转",
    tag: "中型",
    desc: "RAIII14A/RAIII15A/RAIII16A 中型多回转智能执行机构，输出转矩大，性能稳定可靠，适用于各类工业阀门控制。支持多种通信协议，可实现远程监控与智能诊断。",
    specs: [
      ["型号", "RAIII14A / RAIII15A / RAIII16A"],
      ["输出转矩", "203 ~ 400 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 / 72 r/min"],
      ["电机功率", "0.23 ~ 0.80 kW"],
      ["供电电源", "380VAC/50Hz (可选220VAC/50Hz)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"],
      ["重复性误差", "≤ 1%"]
    ],
    downloads: [
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "ra100": {
    id: "ra100",
    name: "RAIII40A / RAIII70A / RAIII90A / RAIII95A",
    image: "images/RA250.png",
    category: "多回转",
    tag: "大转矩",
    desc: "RAIII40A/RAIII70A/RAIII90A/RAIII95A 大转矩智能执行机构，专为大型阀门及重载工业应用设计。可配RGW/RGD系列减速箱。具备强大的输出能力和卓越的耐用性，适用于石油、化工、电力等行业的关键工位。",
    specs: [
      ["型号", "RAIII40A / RAIII70A / RAIII90A / RAIII95A"],
      ["输出转矩", "1020 ~ 3500 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 r/min"],
      ["电机功率", "0.37 ~ 5.5 kW"],
      ["供电电源", "380VAC/50Hz (可选220VAC/50Hz)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "ra35": {
    id: "ra35",
    name: "RAIII30A / RAIII35A",
    image: "images/hero-product.png",
    category: "多回转",
    tag: "智能型",
    desc: "RAIII30A/RAIII35A 智能型多回转电动执行机构，性能稳定可靠，适用于中等口径阀门控制。采用非侵入式设定方式，支持多种通信协议。",
    specs: [
      ["型号", "RAIII30A / RAIII35A"],
      ["输出转矩", "610 / 900 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 r/min"],
      ["电机功率", "0.68 ~ 1.90 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "rl": {
    id: "rl",
    name: "RL智能角行程",
    image: "images/rl-angle-product.png",
    category: "角行程",
    tag: "智能",
    desc: "RL智能角行程执行机构，精确控制90°旋转阀门，特别适用于蝶阀、球阀等部分回转阀门。高精度定位控制，响应迅速，广泛应用于水处理、暖通等行业。",
    specs: [
      ["型号", "RL10 / RL20 / RL40 / RL60 / RL80 / RL100 / RL150 / RL200 / RL250"],
      ["输出转矩", "100 ~ 2000 N·m"],
      ["动作角度", "90°（可调）"],
      ["全行程时间", "15 ~ 90 s"],
      ["连接法兰", "ISO 5211 (F07 / F10 / F12)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["电机功率", "0.07 ~ 0.85 kW"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP67 (可选IP68)"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["位置重复性", "≤ 1%"],
      ["死区", "0.1% ~ 9.9%可调"]
    ],
    downloads: [
      { name: "RL角行程产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "RL选型安装使用说明书", size: "1.6 MB", icon: "📘", url: "files/rl-selection-manual.pdf" },
      { name: "RL10系列外形图", size: "140 KB", icon: "📐", url: "files/rl10-dimension.pdf" },
      { name: "RL80系列外形图", size: "48 KB", icon: "📐", url: "files/rl80-dimension.pdf" },
      { name: "RL150系列外形图", size: "158 KB", icon: "📐", url: "files/rl150-dimension.pdf" }
    ]
  },
  "rlm": {
    id: "rlm",
    name: "RLM智能型",
    image: "images/rl-angle-product.png",
    category: "角行程",
    tag: "智能",
    desc: "RLM智能型调节角行程执行机构，支持4~20mA模拟量控制，精确控制90°旋转阀门，适用于蝶阀、球阀等部分回转阀门。高精度定位控制，响应迅速。",
    specs: [
      ["型号", "RLM10 / RLM20 / RLM40 / RLM60 / RLM80 / RLM100 / RLM150 / RLM200 / RLM250"],
      ["输出转矩", "90 ~ 1650 N·m (调节)"],
      ["动作角度", "90°（可调）"],
      ["全行程时间", "15 ~ 90 s"],
      ["输入信号", "4~20mA / 1~5VDC"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["电机功率", "0.07 ~ 0.85 kW"],
      ["防护等级", "IP67 (可选IP68)"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"],
      ["死区", "0.1% ~ 9.9%可调"]
    ],
    downloads: [
      { name: "RLM智能型产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "RL选型安装使用说明书", size: "1.6 MB", icon: "📘", url: "files/rl-selection-manual.pdf" },
    ]
  },

  "rl100": {
    id: "rl100",
    name: "RL100智能型角行程",
    image: "images/13.png",
    category: "角行程",
    tag: "智能",
    desc: "RL100智能型角行程执行机构，额定转矩800N·m，精确控制90°旋转阀门。适用于蝶阀、球阀等部分回转阀门，广泛应用于水处理、石油化工等行业。",
    specs: [
      ["型号", "RL100 / RLM100"],
      ["输出转矩", "800 N·m (调节720 N·m)"],
      ["动作角度", "90°（可调）"],
      ["全行程时间", "30 s"],
      ["连接法兰", "ISO 5211 F10 / F12"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["电机功率", "0.42 kW"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RL100智能型角行程产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "RL选型安装使用说明书", size: "1.6 MB", icon: "📘", url: "files/rl-selection-manual.pdf" }
    ]
  },

  "rl150": {
    id: "rl150",
    name: "RL150智能型角行程",
    image: "images/3.png",
    category: "角行程",
    tag: "智能",
    desc: "RL150智能型角行程执行机构，额定转矩1000N·m，大转矩输出，适用于大型蝶阀、球阀等部分回转阀门，广泛应用于水处理、石油化工等行业。",
    specs: [
      ["型号", "RL150 / RLM150"],
      ["输出转矩", "1000 N·m (调节900 N·m)"],
      ["动作角度", "90°（可调）"],
      ["全行程时间", "30 s"],
      ["连接法兰", "ISO 5211 F12"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["电机功率", "0.55 kW"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RL150智能型角行程产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "RL选型安装使用说明书", size: "1.6 MB", icon: "📘", url: "files/rl-selection-manual.pdf" }
    ]
  },

  "rjm": {
    id: "rjm",
    name: "RJM调节型",
    image: "images/20130702091501103.jpg",
    category: "配套",
    tag: "高精度",
    desc: "RJM调节型智能执行机构，支持4-20mA模拟量信号控制，调节精度高，响应速度快。适用于需要对阀门开度进行精确控制的工艺流程。",
    specs: [
      ["输入信号", "4mA~20mA / 1VDC~5VDC"],
      ["输出转矩", "60N·m ~ 250N·m"],
      ["基本误差", "≤ ±1.0%"],
      ["回差", "≤ 1%"],
      ["死区", "0.1% ~ 9.9%可调"],
      ["供电电源", "220VAC / 380VAC"],
      ["防护等级", "IP67"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: []
  },
  "rqm3": {
    id: "rqm3",
    name: "RQⅢ 100系列",
    image: "images/20130701114119219.jpg",
    category: "直行程",
    tag: "调节型",
    desc: "RQⅢ100大转矩直行程智能执行机构，支持4~20mA模拟量控制及开关型控制，适用于大口径阀门及重载工业过程控制场景。防护等级IP68。",
    specs: [
      ["型号", "RQⅢ100"],
      ["类型", "直行程 (线性输出)"],
      ["输出转矩", "1020 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 r/min"],
      ["电机功率", "2.1 ~ 3.7 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQ/RQM系列安装使用说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "rq150": {
    id: "rq150",
    name: "RQⅢ150~RQ300系列",
    image: "images/RAIII70A.png",
    category: "直行程",
    tag: "第三代",
    desc: "RQⅢ150~RQ300超大型直行程智能执行机构，支持4~20mA模拟量控制及开关型控制，适用于超大口径重载阀门及工业过程控制场景。防护等级IP68。",
    specs: [
      ["型号", "RQⅢ150 / RQⅢ200 / RQⅢ300"],
      ["类型", "直行程 (线性输出)"],
      ["输出转矩", "1500 ~ 3500 N·m (380VAC)"],
      ["输出转速", "12 / 18 / 24 / 36 r/min"],
      ["电机功率", "3.0 ~ 7.5 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQ/RQM系列安装使用说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "rj": {
    id: "rj",
    name: "RJ开关型",
    image: "images/20130701094818803.jpg",
    category: "角行程",
    tag: "开关型",
    desc: "RJ开关型角行程执行机构，结构简单，操作方便，性价比高。适用于仅需开关控制的蝶阀、球阀等阀门，可靠耐用。",
    specs: [
      ["型号", "RJ10 / RJ20 / RJ40 / RJ60 / RJ80 / RJ100 / RJ150 / RJ200"],
      ["类型", "角行程开关型"],
      ["输出转矩", "100 ~ 2000 N·m"],
      ["动作角度", "90°"],
      ["全行程时间", "15 ~ 90 s"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 (无源触点)"],
      ["防护等级", "IP67 (可选IP68)"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: []
  },
  "rq3": {
    id: "rq3",
    name: "RQⅢ 020~040系列",
    image: "images/20130630161718980.jpg",
    category: "直行程",
    tag: "智能型",
    desc: "RQⅢ020/RQⅢ030/RQⅢ040中型直行程执行机构，集现场控制和远程控制于一体。具备非侵入式设定、图形化显示、智能诊断等先进功能。适用于各类直行程阀门控制。",
    specs: [
      ["型号", "RQⅢ020 / RQⅢ030 / RQⅢ040"],
      ["输出转矩", "203 ~ 400 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 / 72 r/min"],
      ["电机功率", "0.35 ~ 15 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQ/RQM系列安装使用说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" },
      { name: "RQ03外形图", size: "233 KB", icon: "📐", url: "files/rq03-dimension.pdf" },
      { name: "RQ04外形图", size: "249 KB", icon: "📐", url: "files/rq04-dimension.pdf" },
      { name: "RQ06外形图", size: "235 KB", icon: "📐", url: "files/rq06-dimension.pdf" },
      { name: "RQ150外形图", size: "143 KB", icon: "📐", url: "files/rq150-dimension.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "rq060": {
    id: "rq060",
    name: "RQⅢ 060系列",
    image: "images/20130630161718980.jpg",
    category: "直行程",
    tag: "智能型",
    desc: "RQⅢ060大型直行程智能执行机构，适用于大口径阀门控制。具备非侵入式设定、图形化显示、智能诊断等先进功能，防护等级IP68。",
    specs: [
      ["型号", "RQⅢ060"],
      ["输出转矩", "474 ~ 610 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 / 72 r/min"],
      ["电机功率", "1.05 ~ 1.90 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQ/RQM系列安装使用说明书", size: "910 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "ra3": {
    id: "ra3",
    name: "RQⅢ 003~014系列",
    image: "images/20130630103742150.jpg",
    category: "多回转",
    tag: "第三代",
    desc: "RQⅢ003/RQⅢ008/RQⅢ014智能型直行程执行机构，集非侵入式设定、图形化显示、智能诊断等先进功能于一体。适用于小型阀门控制，防护等级IP68。",
    specs: [
      ["型号", "RQⅢ003 / RQⅢ008 / RQⅢ014"],
      ["输出转矩", "34 ~ 108 N·m (380VAC)"],
      ["输出转速", "18 / 24 / 36 / 48 / 72 r/min"],
      ["电机功率", "0.05 ~ 4.3 kW (380VAC)"],
      ["供电电源", "380VAC/50Hz (可选220VAC)"],
      ["控制方式", "开关型 / 调节型 (4~20mA)"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQ/RQM系列安装使用说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "fen": {
    id: "fen",
    name: "R系列分体式",
    image: "images/fenti.jpg",
    category: "多回转",
    tag: "分体式",
    desc: "R系列分体式执行机构，控制器与执行器分体设计，可适应特殊安装环境。控制器可安装在便于操作的位置，执行器安装在阀门现场，灵活可靠。",
    specs: [
      ["类型", "分体式多回转"],
      ["控制器与执行器距离", "最长50m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "执行器IP68 / 控制器IP65"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "R系列分体式安装说明书", size: "1.0 MB", icon: "📄", url: "files/r-series-manual.pdf" },
      { name: "RF10分体外形图", size: "138 KB", icon: "📐", url: "files/rf-dimension.pdf" }
    ]
  },
  "ra-fen": {
    id: "ra-fen",
    name: "RA系列分体式",
    image: "images/rq04-fenti.png",
    category: "多回转",
    tag: "分体式",
    desc: "RA系列多回转分体式执行机构，控制器与执行器分离安装，适用于高温、震动、狭小空间等特殊工况，安装灵活，维护方便。",
    specs: [
      ["类型", "分体式多回转"],
      ["控制器与执行器距离", "最长50m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "执行器IP68 / 控制器IP65"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RA系列安装使用说明书", size: "1.3 MB", icon: "📄", url: "files/ra-installation.pdf" }
    ]
  },
  "rqml06": {
    id: "rqml06",
    name: "RQMLIII06调节型",
    image: "images/1729056743404.png",
    category: "直行程",
    tag: "调节型",
    desc: "RQMLIII06调节型直行程执行机构，采用智能控制技术，实现高精度阀门定位。适用于需要精确调节的工业控制场景，结构紧凑，响应迅速。",
    specs: [
      ["类型", "直行程调节型"],
      ["输出转矩", "60N·m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "调节型（4-20mA）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQMLIII06产品说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" }
    ]
  },
  "rqml12": {
    id: "rqml12",
    name: "RQMLIII12调节型",
    image: "images/RQMLIII12.png",
    category: "直行程",
    tag: "调节型",
    desc: "RQMLIII12调节型直行程执行机构，采用智能控制技术，实现高精度阀门定位。",
    specs: [
      ["类型", "直行程调节型"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "调节型（4-20mA）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQMLIII12产品说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" }
    ]
  },
  "rqml54": {
    id: "rqml54",
    name: "RQMLIII54调节型",
    image: "images/RQMLIII54.png",
    category: "直行程",
    tag: "调节型",
    desc: "RQMLIII54调节型直行程执行机构，采用智能控制技术，实现高精度阀门定位。",
    specs: [
      ["类型", "直行程调节型"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "调节型（4-20mA）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RQMLIII54产品说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" }
    ]
  },
  "rlml10": {
    id: "rlml10",
    name: "RLML10调节型",
    image: "images/RLML10.png",
    category: "直行程",
    tag: "调节型",
    desc: "RLML10调节型直行程执行机构，精密调节控制能力，适用于对阀门开度有精确控制要求的自动化控制系统。",
    specs: [
      ["类型", "直行程调节型"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "调节型（4-20mA）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RLML10产品说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" }
    ]
  },
  "rlml20": {
    id: "rlml20",
    name: "RLML20调节型",
    image: "images/RLML20.png",
    category: "直行程",
    tag: "调节型",
    desc: "RLML20调节型直行程执行机构，精密的调节控制能力，支持多种信号输入。适用于对阀门开度有精确控制要求的自动化控制系统。",
    specs: [
      ["类型", "直行程调节型"],
      ["输出转矩", "200N·m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "调节型（4-20mA）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"]
    ],
    downloads: [
      { name: "RLML20产品说明书", size: "666 KB", icon: "📄", url: "files/rq-rqm-manual.pdf" }
    ]
  },

  "gear": {
    id: "gear",
    name: "RGW系列减速箱",
    image: "images/20130630102425990.jpg",
    category: "配套",
    tag: "配套",
    desc: "配套用减速箱系列，与瑞基各型号电动执行机构完美匹配。传动效率高，运行噪音低，使用寿命长，是阀门自动化系统的关键传动部件。",
    specs: [
      ["配套型号", "RGW6 / RGW8 / RGW9 / RGW10"],
      ["传动比", "根据型号定制"],
      ["适配执行器", "RA系列 / RQ系列"],
      ["润滑方式", "油浴润滑"],
      ["工作制式", "S2-15min"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "R系列减速箱使用说明书", size: "337 KB", icon: "📄", url: "files/r-gearbox-manual.pdf" },
      { name: "RAⅢ30A-RGW6减速箱外形图", size: "281 KB", icon: "📐", url: "files/rgw6-dimension.pdf" }
    ]
  },
  "rib": {
    id: "rib",
    name: "RIB系列减速箱",
    image: "images/rib-gearbox.png",
    category: "配套",
    tag: "配套",
    desc: "RIB系列减速箱，专为阀门电动执行机构配套设计。传动效率高，运行平稳可靠，适配多种执行器型号，满足不同工况下的传动需求。",
    specs: [
      ["配套型号", "RIB系列"],
      ["传动比", "根据型号定制"],
      ["适配执行器", "RA系列 / RQ系列"],
      ["润滑方式", "油浴润滑"],
      ["工作制式", "S2-15min"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "R系列减速箱使用说明书", size: "337 KB", icon: "📄", url: "files/r-gearbox-manual.pdf" }
    ]
  },
  "elec-assy": {
    id: "elec-assy",
    name: "电器总承",
    image: "images/电器总承.png",
    category: "配件",
    tag: "配件",
    desc: "瑞基电动执行机构电器总承组件，包含核心电气控制部件，确保执行机构可靠运行。"
  },
  "ra-ctrl": {
    id: "ra-ctrl",
    name: "RA主控板",
    image: "images/RA主控板.jpg",
    category: "配件",
    tag: "配件",
    desc: "RA系列电动执行机构主控制板，集成控制逻辑与通信接口，支持多种控制模式切换。"
  },
  "ra-power": {
    id: "ra-power",
    name: "RA电源板",
    image: "images/RA电源板.jpg",
    category: "配件",
    tag: "配件",
    desc: "RA系列电动执行机构电源板，为执行机构提供稳定可靠的电源供应与保护功能。"
  },
  "remote": {
    id: "remote",
    name: "遥控器",
    image: "images/遥控器.png",
    category: "配件",
    tag: "配件",
    desc: "瑞基智能型电动执行机构专用遥控器，支持非侵入式设定与操作，方便现场调试与参数设置。"
  },
  "planet-gear": {
    id: "planet-gear",
    name: "行星轮总承",
    image: "images/行星轮总承.png",
    category: "配件",
    tag: "配件",
    desc: "行星轮总承传动组件，采用精密行星齿轮结构，传动效率高，运行平稳，适用于执行机构减速传动。"
  },
  "sun-plate": {
    id: "sun-plate",
    name: "葵花接盘",
    image: "images/葵花接盘.png",
    category: "配件",
    tag: "配件",
    desc: "葵花接盘连接组件，用于执行机构与外部电源信号连接，结构精密，安装方便。"
  }
};
// === RAIII add ===
var ra3Add = [
  ["RAIII13A外形图", "233 KB", "files/RAIII13A外形图.pdf"],
  ["RAIII14A外形图", "248 KB", "files/RAIII14A 外形图.pdf"],
  ["RAIII30A-RGW6-02", "280 KB", "files/RAIII30A-RGW6-02.pdf"],
  ["RAIII30A-RGW7-02", "273 KB", "files/RAIII30A-RGW7-02.pdf"],
  ["RAIII30A外形图", "234 KB", "files/RAIII30A外形图.pdf"],
  ["RAIII35A-RGW8-02", "273 KB", "files/RAIII35A-RGW8-02.pdf"],
  ["RAIII40A-RGW8-02", "175 KB", "files/RAIII40A-RGW8-02.pdf"],
  ["RAIII40A-RGW8-03", "175 KB", "files/RAIII40A-RGW8-03.pdf"],
  ["RAIII70A-RGW8-02", "175 KB", "files/RAIII70A-RGW8-02.pdf"],
  ["RAIII70A-RGW8-03", "175 KB", "files/RAIII70A-RGW8-03.pdf"],
  ["RAIII70A-RGW9-02", "178 KB", "files/RAIII70A-RGW9-02.pdf"]
];
ra3Add.forEach(function(e){ PRODUCTS.ra3.downloads.push({name:e[0],size:e[1],icon:"📐",url:e[2]}); });

// === Fen add ===
var fenAdd = [
  ["RF10分体外形图", "138 KB", "files/RF10 分体外形图.pdf"],
  ["RF10-分体外形图", "138 KB", "files/RF10- 分体外形图.pdf"]
];
fenAdd.forEach(function(e){ PRODUCTS.fen.downloads.push({name:e[0],size:e[1],icon:"📐",url:e[2]}); });

// === RQ3 add ===
var rq3Add = [
  ["RQ03-RGW3外形图", "251 KB", "files/RQ03-RGW3外形图.pdf"],
  ["RQ03-RGW4R外形图", "247 KB", "files/RQ03-RGW4R 外形图.pdf"],
  ["RQ03-RGW4外形图", "253 KB", "files/RQ03-RGW4外形图.pdf"],
  ["RQ03-RGW5R外形图", "249 KB", "files/RQ03-RGW5R 外形图.pdf"],
  ["RQ03-RGW5外形图", "246 KB", "files/RQ03-RGW5外形图.pdf"],
  ["RQ03-RGW6R外形图", "259 KB", "files/RQ03-RGW6R 外形图.pdf"],
  ["RQ04-RGW4R外形图", "263 KB", "files/RQ04-RGW4R 外形图.pdf"],
  ["RQ04-RGW4外形图", "262 KB", "files/RQ04-RGW4外形图.pdf"],
  ["RQ04-RGW5外形图", "263 KB", "files/RQ04-RGW5 外形图.pdf"],
  ["RQ04-RGW5R外形图", "261 KB", "files/RQ04-RGW5R 外形图.pdf"],
  ["RQ04-RGW6外形图", "261 KB", "files/RQ04-RGW6 外形图.pdf"],
  ["RQ04-RGW6R外形图", "267 KB", "files/RQ04-RGW6R 外形图.pdf"],
  ["RQ04-RGW7外形图", "261 KB", "files/RQ04-RGW7 外形图.pdf"],
  ["RQ04-RGW7R外形图", "263 KB", "files/RQ04-RGW7R 外形图.pdf"],
  ["RQ06-RGW7外形图", "257 KB", "files/RQ06-RGW7 外形图.pdf"],
  ["RQ06-RGW7R外形图", "264 KB", "files/RQ06-RGW7R 外形图.pdf"],
  ["RQ06-RGW8外形图", "257 KB", "files/RQ06-RGW8 外形图.pdf"],
  ["RQ06-RGW8R外形图", "261 KB", "files/RQ06-RGW8R 外形图.pdf"],
  ["RQ06-RGW9外形图", "258 KB", "files/RQ06-RGW9 外型图.pdf"],
  ["RQ100-RGW8外形图", "160 KB", "files/RQ100-RGW8 外形图.pdf"],
  ["RQ100-RGW8R外形图", "165 KB", "files/RQ100-RGW8R 外形图.pdf"],
  ["RQ150-RGW10外形图", "149 KB", "files/RQ150-RGW10 外形图.pdf"],
  ["RQ150-RGW9外形图", "153 KB", "files/RQ150-RGW9 外形图.pdf"]
];
rq3Add.forEach(function(e){ PRODUCTS.rq3.downloads.push({name:e[0],size:e[1],icon:"📐",url:e[2]}); });

// === RQM3 add ===
var rqm3Add = [
  ["RQML06直行程外形图", "254 KB", "files/RQML06直行程.pdf"],
  ["RQML12直行程外形图", "266 KB", "files/RQML12直行程.pdf"],
  ["RQML54直行程外形图", "258 KB", "files/RQML54直行程.pdf"]
];
rqm3Add.forEach(function(e){ PRODUCTS.rqm3.downloads.push({name:e[0],size:e[1],icon:"📐",url:e[2]}); });
