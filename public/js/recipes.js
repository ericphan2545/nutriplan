document.addEventListener("DOMContentLoaded", () => {
  // 1. CƠ SỞ DỮ LIỆU CÔNG THỨC (CẬP NHẬT ĐẦY ĐỦ 52 MÓN)
  const recipesDB = {
    "Cơm gà Hội An": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211bb8eaa78a49193e39bf1374969bb2713.jpg",
      ingredients: [
        "1 bát gạo",
        "150g ức gà",
        "Rau thơm, hành",
        "Nghệ tươi",
        "Nước mắm, tiêu",
      ],
      instructions: [
        "Luộc gà với gừng và hành",
        "Nấu cơm bằng nước luộc gà và nghệ",
        "Xé gà trộn với hành phi và gia vị",
        "Dọn cơm kèm rau thơm và nước mắm",
      ],
    },
    "Phở Bò Hà Nội": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512111dfcf065cac26fc487bbc61bf06b3880.jpg",
      ingredients: [
        "200g bánh phở",
        "150g thịt bò",
        "Xương bò",
        "Hành, gừng, quế, hồi",
        "Rau thơm, giá đỗ",
      ],
      instructions: [
        "Ninh xương bò với gừng nướng trong 4-5 tiếng",
        "Thêm quế, hồi, thảo quả vào nước dùng",
        "Trụng bánh phở, xếp thịt bò lên trên",
        "Chan nước dùng nóng, thêm hành và rau thơm",
      ],
    },
    "Bún chả Hà Nội": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512118dae424aca7dcc6e03d49502e50564ad.jpg",
      ingredients: [
        "300g thịt ba chỉ",
        "200g thịt nạc vai xay",
        "200g bún tươi",
        "Nước mắm, đường, tỏi",
        "Rau sống, dưa góp",
      ],
      instructions: [
        "Ướp thịt ba chỉ với nước mắm, đường, tỏi băm",
        "Vo viên thịt xay, ướp gia vị tương tự",
        "Nướng thịt trên than hoa đến vàng thơm",
        "Pha nước chấm chua ngọt, thêm ớt tỏi",
        "Dọn bún kèm thịt nướng, rau sống và nước chấm",
      ],
    },
    "Bánh mì thịt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211b890f3c4b0c5a6e2042935529195dbcc.jpg",
      ingredients: [
        "1 ổ bánh mì",
        "100g pate gan",
        "80g chả lụa",
        "Dưa leo, đồ chua",
        "Rau mùi, ớt, xì dầu",
      ],
      instructions: [
        "Nướng giòn bánh mì",
        "Phết pate đều lên ruột bánh",
        "Xếp chả lụa, thịt nguội lên",
        "Thêm dưa leo, đồ chua, rau mùi",
        "Rưới xì dầu và thêm ớt tùy khẩu vị",
      ],
    },
    "Gỏi cuốn tôm thịt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512113b29efa85e5718ada0a48add33674027.jpg",
      ingredients: [
        "10 tờ bánh tráng",
        "200g tôm sú",
        "150g thịt ba chỉ luộc",
        "Bún, rau sống, húng quế",
        "Đậu phộng, tương đen",
      ],
      instructions: [
        "Luộc tôm và thịt ba chỉ, để nguội thái lát",
        "Nhúng bánh tráng qua nước ấm",
        "Xếp rau, bún, thịt, tôm lên bánh",
        "Cuốn chặt tay từ dưới lên",
        "Pha nước chấm tương đen với đậu phộng giã",
      ],
    },
    "Bún bò Huế": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211a65a9d7e75c2950b772061f5d4240959.jpg",
      ingredients: [
        "300g bún tươi",
        "200g bắp bò",
        "100g giò heo",
        "Sả, ớt, mắm ruốc",
        "Rau muống, bắp chuối",
      ],
      instructions: [
        "Ninh xương và giò heo trong 2 tiếng",
        "Phi sả và ớt, thêm mắm ruốc tạo màu",
        "Cho bắp bò vào hầm mềm",
        "Trụng bún, xếp thịt, chan nước dùng nóng",
        "Ăn kèm rau muống, bắp chuối bào",
      ],
    },
    "Cá kho tộ": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121101c1ece6f4c310b83388e44e8a426d88.jpg",
      ingredients: [
        "500g cá lóc hoặc cá basa",
        "Nước màu (caramel)",
        "Nước mắm, đường, tiêu",
        "Hành lá, ớt, tỏi",
        "Nước dừa tươi",
      ],
      instructions: [
        "Cắt cá thành khúc, ướp với nước mắm và tiêu",
        "Thắng nước màu trong nồi đất",
        "Xếp cá vào, thêm nước dừa và gia vị",
        "Kho lửa nhỏ 30-40 phút cho cá thấm",
        "Rắc hành lá và tiêu trước khi tắt bếp",
      ],
    },
    "Thịt kho tàu": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211f75b0d44512fe25e88f9dd3fe35c47cb.jpg",
      ingredients: [
        "500g thịt ba chỉ",
        "6 quả trứng vịt",
        "Nước dừa tươi",
        "Nước mắm, đường, tỏi",
        "Hành tím, tiêu",
      ],
      instructions: [
        "Cắt thịt miếng vuông, ướp với nước mắm và tỏi",
        "Luộc và bóc vỏ trứng vịt",
        "Thắng nước màu, cho thịt vào đảo đều",
        "Thêm nước dừa, hầm lửa nhỏ 1 tiếng",
        "Cho trứng vào kho thêm 15 phút",
      ],
    },
    "Canh chua cá": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211a9a226403aae0ac8bc0c76af0924ff60.jpg",
      ingredients: [
        "400g cá lóc",
        "200g dứa (thơm)",
        "Cà chua, đậu bắp, giá",
        "Me, rau om, ngò gai",
        "Nước mắm, đường",
      ],
      instructions: [
        "Phi tỏi thơm, cho cà chua vào xào",
        "Đổ nước, thêm me và dứa nấu sôi",
        "Cho cá vào nấu chín",
        "Thêm đậu bắp, giá, nêm gia vị",
        "Rắc rau om, ngò gai trước khi tắt bếp",
      ],
    },
    "Chả giò (Nem rán)": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211da36eabaf4ee0d560de48168b94a5a13.jpg",
      ingredients: [
        "200g thịt heo xay",
        "100g tôm băm",
        "Miến, mộc nhĩ, cà rốt",
        "Bánh tráng nem",
        "Trứng, hành, tiêu",
      ],
      instructions: [
        "Trộn thịt, tôm với miến, mộc nhĩ, cà rốt bào",
        "Nêm gia vị, thêm trứng để kết dính",
        "Cuốn nhân vào bánh tráng chặt tay",
        "Chiên ngập dầu đến vàng giòn",
        "Ăn kèm nước mắm chua ngọt và rau sống",
      ],
    },
    "Cơm tấm sườn bì chả": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512115f00d28a72c4e0461d63cb9102b90340.jpg",
      ingredients: [
        "1 bát cơm tấm",
        "1 miếng sườn nướng",
        "Bì heo, chả trứng",
        "Đồ chua, dưa leo",
        "Mỡ hành, nước mắm",
      ],
      instructions: [
        "Ướp sườn với sả, tỏi, nước mắm, mật ong",
        "Nướng sườn trên than hoặc lò",
        "Trộn bì với thính gạo",
        "Hấp chả trứng",
        "Dọn cơm với sườn, bì, chả và mỡ hành",
      ],
    },
    "Mì Quảng": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512111cd4ebc0fe6f5edb840fe4c940c89ec1.jpg",
      ingredients: [
        "300g mì Quảng",
        "200g tôm, 150g thịt heo",
        "Đậu phộng rang, bánh tráng",
        "Rau sống, hành lá",
        "Nghệ, dầu điều",
      ],
      instructions: [
        "Xào tôm và thịt với nghệ và dầu điều",
        "Thêm nước, nấu thành nước lèo sệt",
        "Trụng mì, xếp ra tô",
        "Chan nước lèo, thêm tôm thịt",
        "Rắc đậu phộng, ăn kèm bánh tráng và rau",
      ],
    },
    "Bánh xèo": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211227bda212912ca66f4fdcc51c15b7bd0.jpg",
      ingredients: [
        "200g bột bánh xèo",
        "200g tôm, 150g thịt ba chỉ",
        "Giá đỗ, hành lá",
        "Nước cốt dừa, nghệ",
        "Rau sống, nước mắm chua ngọt",
      ],
      instructions: [
        "Pha bột với nước cốt dừa và nghệ",
        "Xào tôm thịt sơ qua",
        "Đổ bột vào chảo nóng, thêm nhân và giá",
        "Đậy nắp, chiên đến giòn vàng",
        "Gập đôi bánh, ăn kèm rau và nước chấm",
      ],
    },
    "Hủ tiếu Nam Vang": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121163ea3d4e399a9dc8564c7d012ee19235.jpg",
      ingredients: [
        "200g hủ tiếu khô",
        "100g thịt heo, 100g tôm",
        "Gan, tim heo",
        "Giá, hẹ, hành phi",
        "Xương heo ninh",
      ],
      instructions: [
        "Ninh xương heo lấy nước dùng trong",
        "Trụng hủ tiếu, xếp ra tô",
        "Xếp thịt, tôm, gan, tim lên trên",
        "Chan nước dùng nóng",
        "Rắc hành phi, ăn kèm giá và hẹ",
      ],
    },
    "Bò lúc lắc": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512114690676a46bf3fc17ee07ec6c451e858.jpg",
      ingredients: [
        "300g thịt bò thăn",
        "Tỏi, hành tây",
        "Xì dầu, dầu hào",
        "Tiêu đen, bơ",
        "Cà chua, xà lách",
      ],
      instructions: [
        "Cắt bò thành hạt lựu, ướp xì dầu và tiêu",
        "Đun nóng chảo với bơ và tỏi",
        "Cho bò vào xào lửa lớn nhanh tay",
        "Thêm hành tây, nêm dầu hào",
        "Dọn kèm cà chua, xà lách và cơm trắng",
      ],
    },
    "Gà nướng muối ớt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512116a7638a4b19fca2c111d86388ffa5f94.jpg",
      ingredients: [
        "1 con gà ta (1.2kg)",
        "Muối hạt, ớt bột",
        "Sả, tỏi, gừng",
        "Mật ong, nước mắm",
        "Lá chanh",
      ],
      instructions: [
        "Làm sạch gà, chặt miếng vừa ăn",
        "Ướp gà với muối, ớt, sả, tỏi băm",
        "Để ngấm gia vị 30 phút",
        "Nướng gà trên than hoặc lò 200°C",
        "Phết mật ong, nướng thêm 5 phút cho vàng",
      ],
    },
    "Lẩu thái hải sản": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211f684b0d880c4157c38e2e6063856a4de.jpg",
      ingredients: [
        "500g hải sản các loại",
        "Nấm, đậu hũ, rau",
        "Sả, riềng, lá chanh",
        "Ớt, nước cốt chanh",
        "Nước mắm, sa tế",
      ],
      instructions: [
        "Nấu nước dùng với sả, riềng, lá chanh",
        "Thêm sa tế và ớt tạo vị cay",
        "Cho hải sản, nấm, đậu hũ vào",
        "Nêm nước mắm và nước cốt chanh",
        "Nhúng rau và bún ăn kèm",
      ],
    },
    "Cháo lòng": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512114a8f617e9ab5e1a1211de1521e00a984.jpg",
      ingredients: [
        "200g gạo",
        "300g lòng heo các loại",
        "Huyết heo",
        "Hành lá, gừng, tiêu",
        "Giá, rau mùi, quẩy",
      ],
      instructions: [
        "Làm sạch lòng với muối và giấm",
        "Luộc lòng với gừng, thái lát",
        "Nấu cháo nhừ với nước luộc lòng",
        "Xếp lòng và huyết lên cháo",
        "Rắc hành, tiêu, ăn kèm quẩy và giá",
      ],
    },
    "Bún riêu cua": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121121c7774ff5ecf909e54251366bdd3aa7.jpg",
      ingredients: [
        "300g bún tươi",
        "200g cua đồng",
        "Cà chua, đậu hũ chiên",
        "Mắm tôm, me",
        "Rau muống, hành lá",
      ],
      instructions: [
        "Giã cua, lọc lấy nước và gạch",
        "Nấu nước cua sôi, gạch nổi lên thành riêu",
        "Xào cà chua, thêm nước cua và me",
        "Cho đậu hũ chiên vào",
        "Trụng bún, chan nước riêu, thêm mắm tôm",
      ],
    },
    "Xôi gà": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211cb476ff00d1f5fa213c65106ea2d2d01.jpg",
      ingredients: [
        "300g gạo nếp",
        "200g thịt gà",
        "Hành phi, mỡ gà",
        "Nước mắm, tiêu",
        "Dưa leo, rau mùi",
      ],
      instructions: [
        "Ngâm gạo nếp 4 tiếng, để ráo",
        "Luộc gà, lấy nước trộn vào nếp",
        "Hấp xôi chín dẻo",
        "Xé gà, trộn với mỡ gà và gia vị",
        "Dọn xôi với gà xé, hành phi và dưa leo",
      ],
    },
    "Bánh cuốn": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121195bf6ac219dc8a3be5d7b0e123e07848.jpg",
      ingredients: [
        "300g bột gạo",
        "150g thịt heo xay",
        "Mộc nhĩ, hành khô",
        "Chả lụa, hành phi",
        "Nước mắm chua ngọt",
      ],
      instructions: [
        "Xào thịt với mộc nhĩ và hành",
        "Tráng bột mỏng trên vải hấp",
        "Cho nhân vào, cuộn lại",
        "Xếp bánh ra đĩa, rắc hành phi",
        "Ăn kèm chả lụa và nước mắm chua ngọt",
      ],
    },
    "Bún đậu mắm tôm": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121178444a3dabd4ecb8fc67c5af6bc0b3cd.jpg",
      ingredients: [
        "300g bún lá",
        "200g đậu hũ chiên",
        "Chả cốm, nem chua",
        "Thịt luộc, dồi",
        "Mắm tôm, quất",
      ],
      instructions: [
        "Chiên đậu hũ vàng giòn",
        "Luộc thịt, thái lát",
        "Cắt bún thành miếng vừa ăn",
        "Pha mắm tôm với quất và đường",
        "Bày tất cả ra đĩa, chấm mắm tôm",
      ],
    },
    "Bánh canh cua": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512115361c7b706d799f8e3957fc6a7389637.jpg",
      ingredients: [
        "300g bánh canh bột lọc",
        "200g thịt cua",
        "Trứng cút, chả lụa",
        "Hành, tiêu, nước mắm",
        "Rau mùi, hành phi",
      ],
      instructions: [
        "Nấu nước dùng từ vỏ cua",
        "Thêm thịt cua vào, nêm gia vị",
        "Cho bánh canh vào nấu mềm",
        "Thêm trứng cút và chả lụa",
        "Rắc hành phi và tiêu trước khi ăn",
      ],
    },
    "Cơm chiên dương châu": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211c701c21a5816dd847fae54e9dadf7494.jpg",
      ingredients: [
        "2 bát cơm nguội",
        "100g tôm, 100g lạp xưởng",
        "2 quả trứng",
        "Đậu Hà Lan, cà rốt",
        "Hành lá, xì dầu",
      ],
      instructions: [
        "Xào trứng chín, để riêng",
        "Xào tôm và lạp xưởng thái hạt lựu",
        "Cho cơm vào xào lửa lớn",
        "Thêm rau củ, trứng, nêm xì dầu",
        "Rắc hành lá, đảo đều và dọn ra",
      ],
    },
    "Gà kho gừng": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211263a254f56c7e07cf47066d4fd21625f.jpg",
      ingredients: [
        "500g thịt gà",
        "100g gừng tươi",
        "Nước mắm, đường",
        "Hành tím, tỏi",
        "Tiêu, ớt",
      ],
      instructions: [
        "Chặt gà miếng vừa, ướp nước mắm",
        "Thái gừng sợi, phi thơm với dầu",
        "Cho gà vào xào săn",
        "Thêm nước, kho lửa nhỏ 30 phút",
        "Nêm gia vị, rắc tiêu và hành",
      ],
    },
    "Tôm rim mặn ngọt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512111e13f344eaf045019ebb74124195a30d.jpg",
      ingredients: [
        "400g tôm sú",
        "Nước mắm, đường",
        "Tỏi, ớt, hành",
        "Tiêu đen",
        "Dầu ăn",
      ],
      instructions: [
        "Cắt râu tôm, rửa sạch để ráo",
        "Phi tỏi thơm, cho tôm vào xào",
        "Thêm nước mắm và đường rim",
        "Đảo đều đến khi tôm săn và bóng",
        "Rắc tiêu và hành lá, tắt bếp",
      ],
    },
    "Canh khổ qua nhồi thịt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211d6d4e18f3c6cf76a98aa98bfdd3c2a38.jpg",
      ingredients: [
        "2 quả khổ qua",
        "200g thịt heo xay",
        "Mộc nhĩ, miến",
        "Hành, tiêu, nước mắm",
        "Hành lá",
      ],
      instructions: [
        "Cắt khổ qua khúc, bỏ ruột",
        "Trộn thịt với mộc nhĩ, miến, gia vị",
        "Nhồi thịt vào khổ qua",
        "Nấu nước sôi, cho khổ qua vào",
        "Hầm 25 phút, nêm nước mắm",
      ],
    },
    "Thịt heo quay": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512113fafb630e8dc20dd4c2eff63e5d7f7db.jpg",
      ingredients: [
        "1kg thịt ba chỉ",
        "Ngũ vị hương, muối",
        "Giấm, bột nở",
        "Tỏi, hành tím",
        "Mật ong",
      ],
      instructions: [
        "Luộc sơ thịt, để ráo nước",
        "Ướp mặt thịt với ngũ vị hương và tỏi",
        "Xoa giấm và muối lên da",
        "Để tủ lạnh qua đêm cho da khô",
        "Quay ở 220°C đến khi da giòn vàng",
      ],
    },
    "Vịt nấu chao": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512112849a7e45781df0b26b31d740e3d0854.jpg",
      ingredients: [
        "1/2 con vịt",
        "Chao đỏ",
        "Khoai môn, nấm rơm",
        "Sả, gừng, tỏi",
        "Rau muống, bún",
      ],
      instructions: [
        "Chặt vịt miếng, ướp với chao và sả",
        "Xào vịt săn, thêm nước hầm",
        "Cho khoai môn vào nấu mềm",
        "Thêm nấm rơm, nêm gia vị",
        "Ăn kèm bún và rau muống",
      ],
    },
    "Chè đậu xanh": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211890d01a4143a4d9b04ba39d2a32203ae.jpg",
      ingredients: [
        "200g đậu xanh cà vỏ",
        "100g đường",
        "Nước cốt dừa",
        "Bột năng, muối",
        "Lá dứa",
      ],
      instructions: [
        "Ngâm đậu xanh 2 tiếng, hấp chín",
        "Nấu nước đường với lá dứa",
        "Cho đậu vào, khuấy tan",
        "Nấu nước cốt dừa với chút muối",
        "Múc chè ra bát, rưới nước cốt dừa",
      ],
    },
    "Bánh flan": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512110deb1e4e0a95e5143aa0e03245a87301.jpg",
      ingredients: [
        "4 quả trứng",
        "400ml sữa tươi",
        "100g đường",
        "Vani",
        "Nước caramel",
      ],
      instructions: [
        "Thắng đường thành caramel, đổ vào khuôn",
        "Đánh trứng với sữa và đường",
        "Thêm vani, lọc hỗn hợp qua rây",
        "Đổ vào khuôn, hấp cách thủy 30 phút",
        "Để nguội, úp ngược ra đĩa",
      ],
    },
    "Chè ba màu": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121104f19aa9721eff2bffe60f2f24fc2da2.jpg",
      ingredients: [
        "Đậu xanh, đậu đỏ",
        "Thạch, nước cốt dừa",
        "Đường, đá bào",
        "Sữa đặc",
        "Hạt lựu",
      ],
      instructions: [
        "Nấu chín đậu xanh và đậu đỏ riêng",
        "Cắt thạch thành hạt lựu",
        "Xếp lớp đậu và thạch vào ly",
        "Rưới nước cốt dừa và sữa đặc",
        "Thêm đá bào lên trên",
      ],
    },
    "Sườn xào chua ngọt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512111a7d332b3aeaacb2627f20015e34eb67.jpg",
      ingredients: [
        "500g sườn non",
        "Cà chua, dứa, ớt chuông",
        "Tương cà, giấm",
        "Đường, nước mắm",
        "Hành, tỏi",
      ],
      instructions: [
        "Chặt sườn miếng, ướp gia vị",
        "Chiên sườn vàng, để riêng",
        "Xào cà chua và dứa với sốt chua ngọt",
        "Cho sườn vào đảo đều",
        "Thêm ớt chuông, nêm vừa ăn",
      ],
    },
    "Đậu hũ sốt cà": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211fe68743bfab49703a9d91b42a17ee666.jpg",
      ingredients: [
        "300g đậu hũ non",
        "2 quả cà chua",
        "Hành, tỏi",
        "Nước mắm, đường",
        "Hành lá, tiêu",
      ],
      instructions: [
        "Cắt đậu hũ miếng vuông, chiên vàng",
        "Phi tỏi, xào cà chua nhuyễn",
        "Nêm nước mắm, đường tạo sốt",
        "Cho đậu hũ vào sốt, đảo nhẹ",
        "Rắc hành lá và tiêu",
      ],
    },
    "Cá chiên xù": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211f5b3c12af77cba6bbc0174bce28a7e4d.jpg",
      ingredients: [
        "400g cá phi lê",
        "Bột chiên xù",
        "Trứng, bột mì",
        "Sốt mayonnaise",
        "Chanh, rau sống",
      ],
      instructions: [
        "Cắt cá miếng vừa, ướp muối tiêu",
        "Lăn cá qua bột mì, trứng, bột xù",
        "Chiên ngập dầu đến vàng giòn",
        "Vớt ra để ráo dầu",
        "Ăn kèm sốt mayonnaise và chanh",
      ],
    },
    "Rau muống xào tỏi": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121179bd5c6a9d893b0cab560dbe87b32e51.jpg",
      ingredients: [
        "300g rau muống",
        "5 tép tỏi",
        "Dầu ăn",
        "Nước mắm, đường",
        "Ớt (tùy chọn)",
      ],
      instructions: [
        "Nhặt rau muống, rửa sạch để ráo",
        "Băm nhỏ tỏi, phi vàng thơm",
        "Cho rau vào xào lửa lớn nhanh tay",
        "Nêm nước mắm và chút đường",
        "Đảo đều, tắt bếp khi rau vừa chín",
      ],
    },
    "Súp cua": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211dde2e1fb24afbdc3eb3cd03476d508ef.jpg",
      ingredients: [
        "200g thịt cua",
        "2 quả trứng",
        "Bắp, nấm rơm",
        "Bột năng, hành",
        "Tiêu, dầu mè",
      ],
      instructions: [
        "Nấu nước dùng với xương gà",
        "Thêm bắp và nấm rơm vào",
        "Cho thịt cua, khuấy bột năng tạo sánh",
        "Đánh trứng, rưới từ từ vào súp",
        "Rắc tiêu, hành và dầu mè",
      ],
    },
    "Bò né": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121104b3de0fd17ea25990338d4aeb3c2e1a.jpg",
      ingredients: [
        "150g thịt bò",
        "2 quả trứng ốp la",
        "Pate, xúc xích",
        "Bánh mì, bơ",
        "Hành tây, đồ chua",
      ],
      instructions: [
        "Ướp bò với tiêu và dầu hào",
        "Đun nóng chảo gang với bơ",
        "Áp chảo bò, chiên trứng ốp la",
        "Xếp pate, xúc xích lên chảo",
        "Dọn kèm bánh mì và đồ chua",
      ],
    },
    "Gỏi gà xé phay": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211cb2599c53497463495c2293bdd5010c1.jpg",
      ingredients: [
        "300g ức gà",
        "Bắp cải, hành tây",
        "Rau răm, đậu phộng",
        "Nước mắm, chanh, đường",
        "Ớt, tỏi",
      ],
      instructions: [
        "Luộc gà chín, xé sợi nhỏ",
        "Bào mỏng bắp cải và hành tây",
        "Pha nước mắm chua ngọt với tỏi ớt",
        "Trộn gà với rau, rưới nước mắm",
        "Rắc đậu phộng và rau răm",
      ],
    },
    "Bánh bột lọc": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211c3ea18548b1ec7c3ae5e386725c4a217.jpg",
      ingredients: [
        "200g bột năng",
        "200g tôm",
        "Thịt ba chỉ",
        "Hành phi, nước mắm",
        "Lá chuối",
      ],
      instructions: [
        "Nhào bột năng với nước sôi",
        "Xào tôm thịt với gia vị làm nhân",
        "Cán bột mỏng, gói nhân vào",
        "Hấp bánh trong lá chuối 15 phút",
        "Ăn kèm nước mắm chua ngọt",
      ],
    },
    "Cơm cháy chà bông": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512114b6932d347f15ec934be8f4569cce316.jpg",
      ingredients: [
        "2 bát cơm nguội",
        "100g chà bông",
        "Mỡ hành",
        "Dầu ăn",
        "Nước mắm me",
      ],
      instructions: [
        "Nén cơm thành miếng dẹt",
        "Chiên cơm trong dầu nóng đến giòn",
        "Vớt ra để ráo dầu",
        "Phủ chà bông và mỡ hành lên",
        "Ăn kèm nước mắm me",
      ],
    },
    "Ốc len xào dừa": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512119d990e4e1422e192eb124e75a066cf10.jpg",
      ingredients: [
        "500g ốc len",
        "Nước cốt dừa",
        "Sả, ớt, lá chanh",
        "Nước mắm, đường",
        "Rau răm",
      ],
      instructions: [
        "Ngâm ốc với nước vo gạo, rửa sạch",
        "Phi sả và ớt thơm",
        "Cho ốc vào xào, thêm nước cốt dừa",
        "Nêm nước mắm, đường, thêm lá chanh",
        "Đảo đều, rắc rau răm",
      ],
    },
    "Bún mắm": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211a88863468ef32057c05df468253f6ef6.jpg",
      ingredients: [
        "300g bún tươi",
        "Mắm cá linh",
        "Tôm, mực, thịt quay",
        "Cà tím, đậu bắp",
        "Rau sống, chanh",
      ],
      instructions: [
        "Nấu nước dùng từ mắm cá linh",
        "Cho cà tím, đậu bắp vào nấu chín",
        "Luộc tôm, mực riêng",
        "Trụng bún, xếp hải sản và thịt quay",
        "Chan nước mắm, ăn kèm rau sống",
      ],
    },
    "Cháo vịt": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512113d066527f0294204aa7c5a25aa89b33f.jpg",
      ingredients: [
        "1/2 con vịt",
        "200g gạo",
        "Gừng, hành tím",
        "Rau mùi, hành lá",
        "Tiêu, nước mắm",
      ],
      instructions: [
        "Làm sạch vịt, luộc với gừng",
        "Lấy nước luộc nấu cháo",
        "Chặt vịt miếng, phi hành tím",
        "Múc cháo ra tô, xếp thịt vịt lên",
        "Rắc hành, rau mùi, tiêu",
      ],
    },
    "Bánh tráng trộn": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_202512119fca0f73897e157b77c82629d9c3ec23.jpg",
      ingredients: [
        "200g bánh tráng cắt sợi",
        "Trứng cút, khô bò",
        "Xoài xanh, rau răm",
        "Đậu phộng, hành phi",
        "Sốt me, tương ớt",
      ],
      instructions: [
        "Cắt nhỏ bánh tráng",
        "Luộc trứng cút, bổ đôi",
        "Trộn bánh tráng với khô bò, xoài",
        "Thêm sốt me và tương ớt",
        "Rắc đậu phộng, hành phi, rau răm",
      ],
    },
    "Mì xào hải sản": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121144387b387f9a1b42706f7f522ff67585.jpg",
      ingredients: [
        "200g mì vàng",
        "200g hải sản tổng hợp",
        "Cải ngọt, cà rốt",
        "Xì dầu, dầu hào",
        "Tỏi, hành",
      ],
      instructions: [
        "Trụng mì qua nước sôi, để ráo",
        "Xào hải sản với tỏi, để riêng",
        "Xào mì với xì dầu lửa lớn",
        "Thêm rau củ và hải sản vào",
        "Nêm dầu hào, đảo đều",
      ],
    },
    "Chè trôi nước": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211cb07e79103153c0aef15ad995208f73a.jpg",
      ingredients: [
        "200g bột nếp",
        "100g đậu xanh",
        "Gừng, đường",
        "Nước cốt dừa",
        "Mè rang",
      ],
      instructions: [
        "Nấu nhân đậu xanh với đường",
        "Nhào bột nếp, bọc nhân vo tròn",
        "Luộc bánh trong nước sôi đến nổi",
        "Nấu nước đường gừng",
        "Múc bánh ra, chan nước gừng và cốt dừa",
      ],
    },
    "Thịt bò xào ớt chuông": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211cdab62bf0079c899207c7fc1900b615e.jpg",
      ingredients: [
        "250g thịt bò",
        "2 quả ớt chuông",
        "Hành tây, tỏi",
        "Xì dầu, dầu hào",
        "Tiêu, dầu mè",
      ],
      instructions: [
        "Thái bò lát mỏng, ướp xì dầu và tiêu",
        "Cắt ớt chuông và hành tây miếng vuông",
        "Xào bò lửa lớn nhanh tay, để riêng",
        "Xào ớt chuông và hành tây",
        "Cho bò vào, nêm dầu hào, rưới dầu mè",
      ],
    },
    "Canh bí đỏ nấu tôm": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121136d58b4b9a72326933a7cebd81386703.jpg",
      ingredients: [
        "300g bí đỏ",
        "150g tôm tươi",
        "Hành lá, rau mùi",
        "Nước mắm, tiêu",
        "Hành tím phi",
      ],
      instructions: [
        "Gọt vỏ bí đỏ, cắt miếng vừa",
        "Lột vỏ tôm, ướp chút muối",
        "Nấu nước sôi, cho bí vào nấu mềm",
        "Thêm tôm, nêm nước mắm",
        "Rắc hành lá, rau mùi và tiêu",
      ],
    },
    "Xôi xéo": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_2025121179d2f731d6a1ad78841c1b654a0ac75d.jpg",
      ingredients: [
        "300g gạo nếp",
        "100g đậu xanh",
        "Hành phi, mỡ gà",
        "Nghệ, muối",
        "Ruốc, pate (tùy chọn)",
      ],
      instructions: [
        "Ngâm nếp và đậu xanh qua đêm",
        "Hấp nếp với nghệ tạo màu vàng",
        "Hấp đậu xanh riêng, tán nhuyễn",
        "Xếp xôi ra đĩa, rắc đậu xanh lên",
        "Rưới mỡ gà, hành phi, thêm ruốc",
      ],
    },
    "Cà ri gà": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211ad04e1549ff99516864bf4137284470e.jpg",
      ingredients: [
        "500g thịt gà",
        "Khoai tây, cà rốt",
        "Bột cà ri, sả",
        "Nước cốt dừa",
        "Bánh mì hoặc bún",
      ],
      instructions: [
        "Chặt gà miếng, ướp bột cà ri và sả",
        "Xào gà săn với dầu ăn",
        "Thêm khoai tây, cà rốt và nước",
        "Hầm 30 phút đến khi mềm",
        "Đổ nước cốt dừa, nấu thêm 10 phút",
      ],
    },
    "Nem nướng Nha Trang": {
      image:
        "https://sf-static.upanhlaylink.com/img/image_20251211a0301f470a1bfac7c3c99fc31e2d9c0e.jpg",
      ingredients: [
        "400g thịt heo xay",
        "Mỡ heo, tỏi",
        "Bánh tráng, bún",
        "Rau sống, dưa leo",
        "Nước chấm đặc biệt",
      ],
      instructions: [
        "Xay thịt với mỡ, tỏi và gia vị",
        "Vo viên hoặc xiên que",
        "Nướng trên than hoa đến vàng",
        "Cuốn nem với bánh tráng, bún, rau",
        "Chấm nước mắm pha đặc biệt",
      ],
    },
  };

  // 2. CÁC BIẾN DOM
  const modal = document.getElementById("recipe-modal");
  const modalBody = document.getElementById("modal-body-content");
  const closeBtn = document.querySelector(".close-modal");
  const viewButtons = document.querySelectorAll(".view-recipe-btn");

  // 3. HÀM HIỂN THỊ MODAL
  function openModal(foodName) {
    const recipe = recipesDB[foodName];

    if (recipe) {
      // Tạo HTML cho nội dung
      let ingredientsHtml = recipe.ingredients
        .map((item) => `<li>${item}</li>`)
        .join("");
      let instructionsHtml = recipe.instructions
        .map((step) => `<li>${step}</li>`)
        .join("");

      // Chèn vào Modal
      modalBody.innerHTML = `
                <div class="recipe-header">
                    <img src="${recipe.image}" alt="${foodName}" class="recipe-image-large">
                    <h2 class="recipe-title">${foodName}</h2>
                </div>
                <div class="recipe-content">
                    <div class="recipe-section">
                        <h4>🛒 Nguyên Liệu:</h4>
                        <ul class="recipe-list">${ingredientsHtml}</ul>
                    </div>
                    <div class="recipe-section">
                        <h4>👩‍🍳 Cách Làm:</h4>
                        <ol class="recipe-steps">${instructionsHtml}</ol>
                    </div>
                </div>
            `;

      // Hiển thị Modal
      modal.style.display = "block";
      // Khóa cuộn trang web chính lại
      document.body.style.overflow = "hidden";
    } else {
      alert("Công thức cho món '" + foodName + "' đang được cập nhật!");
    }
  }

  // 4. XỬ LÝ SỰ KIỆN CLICK NÚT "XEM CÔNG THỨC"
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Tìm thẻ cha chứa nút bấm (food-card)
      const card = e.target.closest(".food-card");
      // Lấy tên món ăn từ thẻ h3
      const foodName = card.querySelector(".food-name").innerText.trim();

      openModal(foodName);
    });
  });

  // 5. XỬ LÝ ĐÓNG MODAL
  // Đóng khi ấn nút X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Mở lại cuộn trang
  });

  // Đóng khi ấn ra vùng đen bên ngoài
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
