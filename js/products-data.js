/* ===== RAGA 瑞基 - Product Data ===== */
const PRODUCTS = {
  "ra10": {
    id: "ra10",
    name: "RAIII7A / RAIII11A / RAIII13A",
    image: "images/20210129145229.jpg",
    category: "多回转",
    tag: "智能型",
    desc: "RAIII7A/RAIII11A/RAIII13A 智能型多回转电动执行机构，结构紧凑，体积小、重量轻，适用于中小口径阀门及闸阀、截止阀等的控制。采用非侵入式设定方式，无需打开电气箱盖即可完成所有调试。",
    specs: [
      ["输出转矩", "100N·m / 160N·m"],
      ["输出转速", "24 r/min"],
      ["电机功率", "0.12kW / 0.25kW"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"],
      ["重复性误差", "≤ 1%"]
    ],
    downloads: [
      { name: "RAIII7A/RAIII11A/RAIII13A产品说明书", size: "2.7 MB", icon: "📄", url: "files/ra-selection-manual.pdf" },
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" },
      { name: "安装与调试指南", size: "1.3 MB", icon: "🔧", url: "files/ra-installation.pdf" }
    ]
  },
  "ra40": {
    id: "ra40",
    name: "RAIII14A / RAIII15A / RAIII16A",
    image: "images/20210129144003.jpg",
    category: "多回转",
    tag: "中型",
    desc: "RAIII14A/RAIII15A/RAIII16A 中型多回转智能执行机构，输出转矩大，性能稳定可靠，适用于各类工业阀门控制。支持多种通信协议，可实现远程监控与智能诊断。",
    specs: [
      ["输出转矩", "400N·m / 500N·m"],
      ["输出转速", "36 r/min"],
      ["电机功率", "0.55kW / 0.75kW"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["基本误差", "≤ ±1.0%"],
      ["重复性误差", "≤ 1%"]
    ],
    downloads: [
      { name: "RAIII14A/RAIII15A/RAIII16A产品说明书", size: "2.7 MB", icon: "📄", url: "files/ra-selection-manual.pdf" },
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" }
    ]
  },
  "ra100": {
    id: "ra100",
    name: "RAIII40A / RAIII70A / RAIII90A / RAIII95A",
    image: "images/20210129133414.jpg",
    category: "多回转",
    tag: "大转矩",
    desc: "RAIII40A/RAIII70A/RAIII90A/RAIII95A 大转矩智能执行机构，专为大型阀门及重载工业应用设计。具备强大的输出能力和卓越的耐用性，适用于石油、化工、电力等行业的关键工位。",
    specs: [
      ["输出转矩", "1000N·m / 1600N·m"],
      ["输出转速", "24 r/min"],
      ["电机功率", "1.5kW / 2.2kW"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RAIII40A/RAIII70A/RAIII90A/RAIII95A产品说明书", size: "2.7 MB", icon: "📄", url: "files/ra-selection-manual.pdf" },
      { name: "RA系列选型手册", size: "2.7 MB", icon: "📘", url: "files/ra-selection-manual.pdf" }
    ]
  },
  "rl": {
    id: "rl",
    name: "RL智能角行程",
    image: "images/20130711134549999.jpg",
    category: "角行程",
    tag: "智能",
    desc: "RL智能角行程执行机构，精确控制90°旋转阀门，特别适用于蝶阀、球阀等部分回转阀门。高精度定位控制，响应迅速，广泛应用于水处理、暖通等行业。",
    specs: [
      ["输出转矩", "20N·m ~ 250N·m"],
      ["动作角度", "90°（可调）"],
      ["供电电源", "220VAC / 380VAC"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP67"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["位置重复性", "≤ 1%"],
      ["死区", "0.1% ~ 9.9%可调"]
    ],
    downloads: [
      { name: "RL角行程产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "角行程执行机构选型指南", size: "1.5 MB", icon: "📘", url: "files/rl-manual-zh.pdf" },
      { name: "RL10系列外形图", size: "140 KB", icon: "📐", url: "files/rl10-dimension.pdf" },
      { name: "RL150系列外形图", size: "158 KB", icon: "📐", url: "files/rl150-dimension.pdf" }
    ]
  },
  "rlm": {
    id: "rlm",
    name: "RLM智能型",
    image: "images/20130711134549999.jpg",
    category: "角行程",
    tag: "智能",
    desc: "RLM智能型角行程执行机构，精确控制90°旋转阀门，适用于蝶阀、球阀等部分回转阀门。高精度定位控制，响应迅速。",
    specs: [
      ["输出转矩", "20N·m ~ 250N·m"],
      ["动作角度", "90°（可调）"],
      ["供电电源", "220VAC / 380VAC"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP67"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["位置重复性", "≤ 1%"],
      ["死区", "0.1% ~ 9.9%可调"]
    ],
    downloads: [
      { name: "RLM智能型产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "角行程执行机构选型指南", size: "1.5 MB", icon: "📘", url: "files/rl-manual-zh.pdf" }
    ]
  },

  "rl150": {
    id: "rl150",
    name: "RL150智能型角行程",
    image: "images/3.png",
    category: "角行程",
    tag: "智能",
    desc: "RL150智能型角行程执行机构，大转矩输出，精确控制90°旋转阀门。适用于大型蝶阀、球阀等部分回转阀门，广泛应用于水处理、石油化工等行业。",
    specs: [
      ["输出转矩", "1500N·m"],
      ["动作角度", "90°（可调）"],
      ["供电电源", "380VAC/50Hz"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RL150智能型角行程产品说明书", size: "810 KB", icon: "📄", url: "files/rl-manual.pdf" },
      { name: "RL150系列外形图", size: "158 KB", icon: "📐", url: "files/rl150-dimension.pdf" }
    ]
  },

  "rjm": {
    id: "rjm",
    name: "RJM调节型",
    image: "images/20130702091501103.jpg",
    category: "就地成套",
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
    downloads: [
      { name: "RJM调节型产品说明书", size: "1.3 MB", icon: "📄", url: "files/multi-turn-installation.pdf" }
    ]
  },
  "rqm3": {
    id: "rqm3",
    name: "RQMⅢ系列",
    image: "images/20130701114119219.jpg",
    category: "多回转",
    tag: "第三代",
    desc: "RQMⅢ系列第三代智能直行程执行机构，在原RQM基础上进行全面升级，性能更稳定，功能更强大。防护等级IP68，适用于严苛环境。",
    specs: [
      ["类型", "直行程"],
      ["输出转矩", "60N·m ~ 2000N·m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["通信方式", "现场总线/以太网/无线"]
    ],
    downloads: [
      { name: "RQMⅢ系列产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" },
      { name: "第三代智能执行机构介绍", size: "666 KB", icon: "📘", url: "files/ra3-rq3-manual.pdf" },
      { name: "RQML直行程外形图", size: "255 KB", icon: "📐", url: "files/rqml-dimension.pdf" }
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
      ["类型", "角行程开关型"],
      ["输出转矩", "60N·m ~ 800N·m"],
      ["供电电源", "220VAC / 380VAC"],
      ["控制方式", "开关型"],
      ["防护等级", "IP67"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RJ开关型产品说明书", size: "1.5 MB", icon: "📄", url: "files/rl-manual-zh.pdf" },
      { name: "RL80系列外形图", size: "48 KB", icon: "📐", url: "files/rl80-dimension.pdf" }
    ]
  },
  "rq3": {
    id: "rq3",
    name: "RQⅢ执行机构",
    image: "images/20130630161718980.jpg",
    category: "多回转",
    tag: "智能型",
    desc: "RQⅢ第三代智能型直行程执行机构，集现场控制和远程控制于一体。具备非侵入式设定、图形化显示、智能诊断等先进功能。",
    specs: [
      ["类型", "直行程"],
      ["输出转矩", "60N·m ~ 600N·m"],
      ["输出转速", "1 r/min ~ 96 r/min"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"]
    ],
    downloads: [
      { name: "RQⅢ系列产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" },
      { name: "RQ03外形图", size: "233 KB", icon: "📐", url: "files/rq03-dimension.pdf" },
      { name: "RQ04外形图", size: "249 KB", icon: "📐", url: "files/rq04-dimension.pdf" },
      { name: "RQ06外形图", size: "235 KB", icon: "📐", url: "files/rq06-dimension.pdf" }
    ]
  },
  "ra3": {
    id: "ra3",
    name: "RAⅢ系列电动",
    image: "images/20130630103742150.jpg",
    category: "多回转",
    tag: "第三代",
    desc: "RAⅢ系列第三代智能型多回转电动执行机构，采用非侵入式设定方式，配备图形点阵式液晶显示器，支持多语言、数字、图形显示，可实时显示转矩、阀门位置、限位设定等工作状态及报警信息。",
    specs: [
      ["类型", "多回转"],
      ["输出转矩", "100N·m ~ 1600N·m"],
      ["供电电源", "380VAC/50Hz"],
      ["控制方式", "开关型/调节型"],
      ["显示", "图形点阵式LCD"],
      ["设定方式", "非侵入式（独立设定器）"],
      ["防护等级", "IP68"],
      ["防爆标志", "ExdⅡCT4"],
      ["环境温度", "-30℃ ~ +70℃"],
      ["通信方式", "现场总线/工业以太网/无线"]
    ],
    downloads: [
      { name: "RAⅢ系列产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" },
      { name: "RAⅢ技术参数表", size: "655 KB", icon: "📘", url: "files/enterprise-standard.pdf" },
      { name: "RAⅢ40A外形图", size: "169 KB", icon: "📐", url: "files/ra3-dimension.pdf" },
      { name: "RAⅢ95A外形图", size: "172 KB", icon: "📐", url: "files/ra3-dimension-large.pdf" }
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
      { name: "R系列分体式产品说明书", size: "2.7 MB", icon: "📄", url: "files/ra-selection-manual.pdf" },
      { name: "RF10分体外形图", size: "138 KB", icon: "📐", url: "files/rf-dimension.pdf" }
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
      { name: "RQMLIII06产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" }
    ]
  },
  "rqml12": {
    id: "rqml12",
    name: "RQMLIII12调节型",
    image: "images/1729057838899.png",
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
      { name: "RQMLIII12产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" }
    ]
  },
  "rqml54": {
    id: "rqml54",
    name: "RQMLII54调节型",
    image: "images/1729057838899.png",
    category: "直行程",
    tag: "调节型",
    desc: "RQMLII54调节型直行程执行机构，采用智能控制技术，实现高精度阀门定位。",
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
      { name: "RQMLII54产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" }
    ]
  },
  "rlml10": {
    id: "rlml10",
    name: "RLML10调节型",
    image: "images/5.png",
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
      { name: "RLML10产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" }
    ]
  },
  "rlml20": {
    id: "rlml20",
    name: "RLML20调节型",
    image: "images/5.png",
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
      { name: "RLML20产品说明书", size: "666 KB", icon: "📄", url: "files/ra3-rq3-manual.pdf" }
    ]
  },

  "gear": {
    id: "gear",
    name: "RGW系列减速箱",
    image: "images/20130630102425990.jpg",
    category: "就地成套",
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
      { name: "减速箱产品手册", size: "655 KB", icon: "📄", url: "files/enterprise-standard.pdf" },
      { name: "RAⅢ30A-RGW6减速箱外形图", size: "281 KB", icon: "📐", url: "files/rgw6-dimension.pdf" }
    ]
  },
  "rib": {
    id: "rib",
    name: "RIB系列减速箱",
    image: "images/rib-gearbox.png",
    category: "就地成套",
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
      { name: "RIB系列减速箱产品手册", size: "655 KB", icon: "📄", url: "files/enterprise-standard.pdf" }
    ]
  }
};
