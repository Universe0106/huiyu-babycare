import React, { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface KnowledgeCategory {
  id: string
  title: string
  icon: string
  articles: Article[]
}

interface Article {
  id: string
  title: string
  content: string
  tags?: string[]
}

// 知识库内容
const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    id: 'daily',
    title: '日常护理',
    icon: '🧴',
    articles: [
      {
        id: 'diaper-rash',
        title: '红屁股（尿布疹）',
        content: '尿布疹是新生儿常见的皮肤问题，主要表现为臀部皮肤发红、伴有小疹子。\n\n【原因】\n- 尿液和粪便长时间刺激皮肤\n- 尿布不透气\n- 摩擦导致的皮肤破损\n\n【护理方法】\n1. 保持臀部清洁干燥，及时更换尿布\n2. 每次换尿布后用温水清洗臀部，轻轻拍干\n3. 使用含氧化锌的护臀膏\n4. 每天安排透气时间，让宝宝光屁股一会儿\n5. 选择透气性好的尿布\n\n【就医建议】\n如果出现水泡、脓疱或超过3天未好转，请及时就医。',
        tags: ['新生儿', '皮肤', '常见问题']
      },
      {
        id: 'umbilical',
        title: '脐带护理',
        content: '脐带残端通常在出生后1-3周内自然脱落，期间需要正确护理。\n\n【护理方法】\n1. 保持脐部干燥清洁\n2. 洗澡时避免脐部浸水，可用防水贴保护\n3. 更换尿布时注意不要盖住脐部\n4. 不要手动拉扯脐带残端\n5. 用75%酒精或碘伏消毒脐部（遵医嘱）\n\n【异常情况】\n- 脐部红肿、有异味或有脓性分泌物\n- 脐带超过3周未脱落\n出现以上情况请及时就医。',
        tags: ['新生儿', '脐带', '护理']
      },
      {
        id: 'eczema',
        title: '湿疹',
        content: '湿疹（特应性皮炎）是婴幼儿常见的皮肤问题，表现为皮肤发红、瘙痒、干燥。\n\n【原因】\n- 皮肤屏障功能不完善\n- 过敏体质\n- 环境刺激\n\n【护理方法】\n1. 保持皮肤湿润，每天多次涂抹保湿霜\n2. 使用温和的无刺激洗护产品\n3. 避免过热，穿纯棉衣物\n4. 修剪指甲，避免抓挠\n5. 母乳喂养可以降低湿疹风险\n\n【就医建议】\n如果湿疹严重、影响睡眠或出现感染症状，请及时就医。',
        tags: ['皮肤', '过敏', '常见问题']
      },
      {
        id: 'sleep',
        title: '睡眠',
        content: '0-3个月宝宝每天睡眠时间约14-17小时，包括白天小睡。\n\n【睡眠建议】\n1. 建立固定的睡眠规律\n2. 营造安静、舒适的睡眠环境\n3. 区分白天和夜晚的不同\n4. 哄睡时保持平静的氛围\n5. 仰卧是最安全的睡姿\n\n【夜醒】\n夜醒是正常现象，这个阶段的宝宝胃容量小，需要频繁吃奶。不要过度干预，等宝宝自然入睡。',
        tags: ['睡眠', '日常护理']
      }
    ]
  },
  {
    id: 'symptom',
    title: '常见症状',
    icon: '🤒',
    articles: [
      {
        id: 'fever',
        title: '发烧',
        content: '发烧是身体对抗感染的自然反应，但需要密切观察。\n\n【判断标准】\n- 3个月以下：体温≥38°C需立即就医\n- 3个月以上：体温≥38.5°C可考虑退烧\n\n【家庭护理】\n1. 物理降温：温水擦浴（不要用冰水）\n2. 补充水分：多喝奶或温水\n3. 保持室温舒适：24-26°C\n4. 必要时使用退烧药（遵医嘱）\n\n【就医建议】\n- 3个月以下宝宝发烧\n- 体温超过40°C\n- 伴随皮疹、呕吐、呼吸困难\n- 发热超过24小时仍未退\n出现以上情况请立即就医。',
        tags: ['发烧', '发热', '症状']
      },
      {
        id: 'cold',
        title: '感冒',
        content: '感冒（上呼吸道感染）在婴幼儿中很常见，通常一周左右自愈。\n\n【症状】\n- 流鼻涕、鼻塞\n- 咳嗽\n- 轻微发热\n- 食欲下降\n\n【家庭护理】\n1. 多休息，补充水分\n2. 生理盐水滴鼻，缓解鼻塞\n3. 使用加湿器保持空气湿润\n4. 少量多餐喂养\n\n【就医建议】\n如果出现高热、呼吸困难、持续咳嗽超过一周，请就医。',
        tags: ['感冒', '咳嗽', '症状']
      },
      {
        id: 'diarrhea',
        title: '腹泻',
        content: '腹泻在婴幼儿中常见，主要表现为大便次数增多、稀薄。\n\n【原因】\n- 病毒感染（如轮状病毒）\n- 细菌感染\n- 食物过敏\n- 乳糖不耐受\n\n【家庭护理】\n1. 补充水分，防止脱水（ORS补液盐）\n2. 继续正常喂养（母乳喂养的宝宝继续母乳）\n3. 每次腹泻后补充液体\n4. 注意臀部护理，防止红屁股\n\n【就医建议】\n- 大便带血\n- 持续高热\n- 超过24小时无好转\n- 出现脱水症状（尿少、哭无泪）\n请立即就医。',
        tags: ['腹泻', '消化', '症状']
      },
      {
        id: 'constipation',
        title: '便秘',
        content: '便秘表现为大便干硬、排便困难、排便间隔增长。\n\n【判断标准】\n- 大便干硬如羊粪球\n- 排便时用力、哭闹\n- 3天以上才排便\n\n【家庭护理】\n1. 6个月以上宝宝多喝水\n2. 适当按摩肚子（顺时针）\n3. 添加辅食后可以吃蔬菜泥、水果泥\n4. 适当增加运动\n\n【就医建议】\n如果便秘持续时间长、影响食欲或出现腹胀，请就医。',
        tags: ['便秘', '消化', '症状']
      }
    ]
  },
  {
    id: 'growth',
    title: '发育监测',
    icon: '📈',
    articles: [
      {
        id: 'height-weight',
        title: '身高体重',
        content: '定期测量身高体重是监测宝宝发育的重要方式。\n\n【参考标准（WHO）】\n\n3个月男宝宝：\n- 身高：55-67cm（中位数61cm）\n- 体重：4.5-8kg（中位数6kg）\n\n3个月女宝宝：\n- 身高：54-65cm（中位数59cm）\n- 体重：4-7.5kg（中位数5.5kg）\n\n【测量建议】\n1. 使用统一的测量工具\n2. 固定时间测量（如每月1号）\n3. 记录数据，观察趋势\n\n【注意事项】\n每个宝宝发育速度不同，只要在正常范围内就不用担心。',
        tags: ['发育', '身高', '体重']
      },
      {
        id: 'motor',
        title: '大运动发育',
        content: '大运动发育是宝宝成长的重要里程碑。\n\n【0-3个月发育标准】\n\n1个月：\n- 能抬头一瞬间\n- 对声音有反应\n\n2个月：\n- 能短暂抬头\n- 会发出"咯咯"声\n\n3个月：\n- 抬头较稳\n- 用手抓东西\n- 会对人笑\n\n【促进发育】\n1. 多让宝宝趴着（锻炼抬头）\n2. 用颜色鲜艳的玩具逗引\n3. 多和宝宝说话交流\n4. 做被动操\n\n【就医建议】\n如果发育明显落后于同龄宝宝，请咨询儿科医生。',
        tags: ['发育', '大运动', '里程碑']
      }
    ]
  },
  {
    id: 'feed',
    title: '喂养指导',
    icon: '🍼',
    articles: [
      {
        id: 'milk-formula',
        title: '奶粉选择',
        content: '奶粉喂养的宝宝，选择合适的奶粉很重要。\n\n【奶粉段位】\n- 1段：0-6个月\n- 2段：6-12个月\n- 3段：12-36个月\n\n【选择要点】\n1. 选择正规品牌\n2. 根据宝宝年龄选择段位\n3. 观察宝宝是否适应（有无过敏、腹泻）\n4. 不必盲目追求进口或高价\n\n【喂养量】\n3个月宝宝每天约6-8次，每次120-150ml\n\n【注意事项】\n1. 按比例冲调，不要过浓\n2. 保持奶具清洁\n3. 喂奶后拍嗝',
        tags: ['奶粉', '喂养', '辅食']
      },
      {
        id: 'solid-food',
        title: '辅食添加',
        content: '辅食添加是宝宝成长中的重要阶段。\n\n【添加时间】\n建议6个月开始添加辅食，最早不早于4个月。\n\n【添加信号】\n- 能够坐稳\n- 对食物感兴趣\n- 挺舌反射消失\n\n【添加原则】\n1. 从单一到多样\n2. 从稀到稠\n3. 从细到粗\n4. 每次只添加一种新食物\n5. 观察3天无过敏再添加新的\n\n【优先添加的食物】\n- 含铁米粉\n- 蔬菜泥\n- 水果泥\n- 肉泥\n\n【注意事项】\n1岁前不要添加盐、糖、蜂蜜',
        tags: ['辅食', '喂养', '添加']
      }
    ]
  },
  {
    id: 'health',
    title: '健康防护',
    icon: '💉',
    articles: [
      {
        id: 'vaccine',
        title: '疫苗接种',
        content: '疫苗接种是预防疾病的重要手段。\n\n【0-3个月常见疫苗】\n\n出生时：\n- 乙肝疫苗（第1针）\n- 卡介苗\n\n1个月：\n- 乙肝疫苗（第2针）\n\n2个月：\n- 脊髓灰质炎疫苗（第1针）\n- 百白破疫苗（第1针）\n- Hib疫苗（第1针）\n\n3个月：\n- 脊髓灰质炎疫苗（第2针）\n- 百白破疫苗（第2针）\n- Hib疫苗（第2针）\n\n【接种后注意事项】\n1. 观察30分钟后再离开\n2. 接种部位可能出现红肿\n3. 宝宝可能出现轻微发热\n4. 多给宝宝喝水\n\n【不适情况】\n如果出现高热、严重红肿、过敏等，请及时就医。',
        tags: ['疫苗', '接种', '健康']
      },
      {
        id: 'medicine',
        title: '常见用药',
        content: '宝宝用药需要格外谨慎。\n\n【退烧药】\n- 对乙酰氨基酚（泰诺林）：3个月以上可用\n- 布洛芬（美林）：6个月以上可用\n- 使用剂量按体重计算\n\n【感冒药】\n不建议给婴幼儿使用复方感冒药\n\n【腹泻用药】\n- 口服补液盐：预防脱水\n- 益生菌：调节肠道菌群\n\n【用药原则】\n1. 遵医嘱用药\n2. 不要自行给药\n3. 看清剂量说明\n4. 优先选择儿童专用药\n5. 不要用成人药减量',
        tags: ['用药', '健康', '常见问题']
      }
    ]
  }
]

export default function Knowledge() {
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('daily')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleSearch = () => {
    if (searchText) {
      Taro.showToast({ title: '搜索功能开发中', icon: 'none' })
    }
  }

  const currentCategory = KNOWLEDGE_CATEGORIES.find(c => c.id === activeCategory)
  const currentArticles = currentCategory?.articles || []

  // 显示文章详情
  const showArticleDetail = (article: Article) => {
    setSelectedArticle(article)
  }

  // 返回文章列表
  const backToList = () => {
    setSelectedArticle(null)
  }

  // 如果查看文章详情
  if (selectedArticle) {
    return (
      <View className="knowledge">
        <View className="header">
          <Text className="back-btn" onClick={backToList}>‹ 返回</Text>
          <Text className="title">{selectedArticle.title}</Text>
        </View>
        
        <ScrollView scrollY className="article-detail">
          <View className="detail-content">
            {selectedArticle.tags && (
              <View className="tags">
                {selectedArticle.tags.map(tag => (
                  <Text key={tag} className="tag">{tag}</Text>
                ))}
              </View>
            )}
            <Text className="detail-text">{selectedArticle.content}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className="knowledge">
      <View className="header">
        <Text className="title">知识库</Text>
      </View>

      <View className="search-box">
        <View className="search-input-wrapper">
          <Input 
            className="search-input"
            placeholder="搜索育儿知识"
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
            onConfirm={handleSearch}
          />
        </View>
      </View>

      <ScrollView scrollX className="categories-scroll">
        <View className="categories">
          {KNOWLEDGE_CATEGORIES.map(cat => (
            <View 
              key={cat.id}
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Text className="cat-icon">{cat.icon}</Text>
              <Text className="cat-title">{cat.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <ScrollView scrollY className="article-list-scroll">
        <View className="article-list">
          {currentArticles.map((article, idx) => (
            <View 
              key={article.id} 
              className="article-item"
              onClick={() => showArticleDetail(article)}
            >
              <View className="article-info">
                <Text className="article-title">{article.title}</Text>
                {article.tags && article.tags.length > 0 && (
                  <Text className="article-tags">{article.tags.slice(0, 2).join(' • ')}</Text>
                )}
              </View>
              <Text className="arrow">›</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

import { Input } from '@tarojs/components'
