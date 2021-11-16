# PixiJS 新人作業 DEMO
- 計算機 https://aipinhsuan.github.io/pixijs/calculator/main.html
- 運動軌跡模擬 https://aipinhsuan.github.io/pixijs/sport/main.html
- 俄羅斯方塊 https://aipinhsuan.github.io/pixijs/tetris/main.html

# 計算機說明
製作電腦的小算盤，計算及記憶體存取。  
![計算機介面](https://github.com/aipinhsuan/pixijs/blob/main/%E8%A8%88%E7%AE%97%E6%A9%9F%E4%BB%8B%E9%9D%A2.png)
# 運動軌跡模擬
*（綠點為中心點）*  
![運動軌跡模擬介面](https://github.com/aipinhsuan/pixijs/blob/main/%E7%90%83%E9%AB%94%E9%81%8B%E5%8B%95%E7%95%8C%E9%9D%A2.png)
- 功能介紹：  
  **Sprite Sheet：** 切換下一個新增的物件型態（圖形或飛機旋轉動畫）。  
  **播放：** 播放運動軌跡。  
  **暫停：** 暫停運動軌跡。  
  **清除：** 清空物件，回到初始設定。  
  **數量：** 增減物件數量。  
  **速度：** 增減物件運動速度。  
  **邊數：** 增減圖案物件的邊數。  
  **FPS：** 增減FPS。  
  **直線：** 隨機朝一個方向進行直線運動。  
  **拋物線：** 以中心點為最高點進行拋物線軌跡。  
  **圓形：** 以中心點為圓心進行繞園運動。  
  **橢圓形：** 以中心點為中心繞橢圓形。  
  **正弦：** 以中心點為座標軸原點，跑正弦軌跡。  
  **餘弦：** 以中心點為座標軸原點，跑餘弦軌跡。  
  **摩擦：** 向左或向右直線前進（有摩擦力）直到靜止。  
  **彈跳：** 從當前位置向下墜落並彈跳。  
  **碰撞：** 隨機方向直線前進，當產生碰撞會反彈。  
  

# 俄羅斯方塊說明
![俄羅斯方塊介面](https://aipinhsuan.github.io/pixijs/%E4%BF%84%E7%BE%85%E6%96%AF%E6%96%B9%E5%A1%8A%E4%BB%8B%E9%9D%A2.png)
- 方塊種類：
  *（每20個會出現一個特殊方塊）*  
  ![方塊種類](https://aipinhsuan.github.io/pixijs/%E6%96%B9%E5%A1%8A%E4%BB%8B%E7%B4%B9.png)
- 遊戲玩法：
  <table>
    <tr><td>旋轉：↑ 或 Space </td></tr>
    <tr><td>左移：←</td></tr>
    <tr><td>右移：→</td></tr>
    <tr><td>加速下降：↓</td></tr>
  </table>

- 特殊功能1：將方塊變成特殊方塊1（顏色變橄欖綠），當消除所有特殊方塊1時，會**隨機**消除一種顏色的方塊。
- 特殊功能2：將方塊變成特殊方塊2（顏色變白色），當消除所有特殊方塊2時，會消除**最多**顏色的方塊。
 
- 分數計算：
  <table>
    <tr><td>一次消一列：+100</td></tr>
    <tr><td>一次消二列：+300</td></tr>
    <tr><td>一次消三列：+500</td></tr>
    <tr><td>一次消四列：+800</td></tr>
    <tr><td>消除特殊方塊：每格+50</tr></td>
  </table>  
