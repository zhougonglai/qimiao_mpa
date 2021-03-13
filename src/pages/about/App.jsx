import React, { useEffect, useRef } from 'react';
import Tabs from '~/components/Tabs';
import TabItem from '~/components/Tabs/Tab';
import './App.scss';
import banner from '~/assets/img/about/aboutbanner.png';
import { useMount, useSetState } from 'ahooks';

function App() {
  const tabRef = useRef()
  const [ route, setRoute ] = useSetState(location)
  const [ state, setState ] = useSetState({ index: 'about' })

  useEffect(() => {
    if(route.search) {
      const params = new URLSearchParams(route.search);
      setState({
        index: params.get('index')
      })
      tabRef.current.changeTab(params.get('index'))
    }
  }, [])

  const handleTabChange = () => {
    if(route.search && route.search.includes('index')) {
      const params = new URLSearchParams(route.search);
      params.delete('index');
      const search = params.toString();
      history.replaceState(null, document.title, `${location.pathname}${search ? `?${search}` : ''}`)
    }
  }

  return (
    <Tabs defaultIndex={state.index} className="qm-tabs flex" ref={tabRef} onTabClick={handleTabChange}>
      <TabItem label="关于我们" index='about' className="qm-tab">
        <div className="qm-tab-title">
          关于我们
        </div>
        <div className="qm-tab-content flex flex-col mt-4">
          <img src={banner} className="my-4"/>
          <p className="indent-5">
            武汉奇妙科技有限公司是一家专门从事计算机软硬件研发、提供专业技术服务的互联网公司。奇妙科技致力于通过部署自研软件系统实现全球加速，采用金融级专线，自建SDN虚拟化监控和调度平台，并制定有效的技术解决方案配合全节点顶级专线,达到行业顶尖的加速水平。
          </p>
          <p className="indent-5">
            <b>企业价值观：</b>
            我们奇思妙想，不断研发新产品，创新、优化产品功能，让玩家在有限的游戏时间内体验加倍的快感！
          </p>
          <p className="indent-5">
            <b>产品特色：</b>
            奇妙加速器，同样的时间，加倍的快感！
          </p>
          <p className="indent-5">
            <b>未来发展： </b>
            奇妙科技从游戏加速器出发，希望真正打造一个覆盖全网的全民网络娱乐平台。让每一位玩家都能享有最佳体验感！
          </p>
          <p className="indent-5">
            <b>客服邮箱：</b>
            <a className="hover:underline" href="mailto:Service@qimiao.com">Service@qimiao.com</a>
          </p>
          <p className="indent-5">
            <b>公司规模：</b>
            奇妙科技2018年5月成立于武汉，公司员工本科和硕士学历占比95%以上，研发及市场运营团队已近百人，其中研发核心人员由行业顶级架构师和资深工程师构成，均来自985、211等知名高校。拥有专业客服及运维团队，保障用户拥有更优质的产品体验。
          </p>
          <p className="indent-5">
            <b>产品与服务：</b>
            奇妙科技旗下“奇妙加速器”是一款专注于游戏加速的产品，目前支持PC端和移动端百余款热门游戏，产品加速效果显著、运维能力突出，圆满支持市面热门网络游戏，有效解决了网游卡机、掉线、延时高、登录难等问题。
          </p>
        </div>
      </TabItem>
      <TabItem label="用户协议" index='service' className="qm-tab">
        <div className="qm-tab-title">用户协议</div>
        <div className="qm-tab-content mt-4">
          <p className="indent-5">
            以下是您与〔Qimiao〕（“奇妙科技”）达成的法律协议，协议条款对您使用“奇妙加速器/奇妙网游加速器”服务进行了规定。本协议连同所有更新材料、补充条款、软件许可证、以及奇妙科技的一切规则和和政策共同构成了您与奇妙科技之间的“协议”。若您对本协议的任何条款表示异议，您可以选择不进入并使用“奇妙加速器/奇妙网游加速器”服务。您进入“奇妙加速器/奇妙网游加速器”服务，则意味着您将自愿遵守您所阅读的这些条款，任何更改、添加或删除都是不允许的。若与本协议的有关规定相悖，奇妙科技可拒绝相关的访问。
          </p>
          <p><b>1.“奇妙加速器/奇妙网游加速器 ”服务定义</b></p>
          <p>
            “奇妙加速器/奇妙网游加速器”服务由奇妙科技提供，允许您在遵守本协议特定条款和条件的前提下播放或下载音频、视频和手机铃声等数字内容。
          </p>
          <p>
            <b className="mt-2">
              2.不良资料
            </b>
          </p>
          <p>
            您了解在使用“奇妙加速器/奇妙网游加速器”服务时，您可能会碰到被认为是具有攻击性的、秽亵的或者令人不愉快的内容，不管这些内容是否被清楚地表达。尽管如此，您同意在使用“奇妙加速器/奇妙网游加速器”服务时独担风险，奇妙科技不对可能存在的不良内容承担任何责任。
          </p>
          <p>
            <b>
              3.系统需求
            </b>
          </p>
          <p>
            使用本服务需要一个或多个兼容的设备、互联网接入（可能收费）以及特定的软件（可能收费），并且需要不时获取更新资料或升级。由于使用本服务涉及硬件、软件和互联网接入，您使用本服务的性能可能受这些因素的影响。本系统需求的必备条件会不时发生更改，您确认并同意您对本系统需求的必备条件负责。
          </p>
          <p>
            <b>
              4. 奇妙科技隐私制度
            </b>
          </p>
          <p>
            除本协议另有明确规定以外，本服务以网站上的奇妙科技隐私制度为准。如果您尚未阅读奇妙科技隐私策略，请您现在阅读。
          </p>
          <p>
            <b>
              5.您的信息
            </b>
          </p>
          <p>
            您同意提供注册该服务所需的准确的、最新的和完整的信息，在本服务使用过程的其他地方也可能需要这些信息（“注册资料”）。您还同意根据需要维护并及时更新您的注册信息，以确保信息的准确性、及时性和完整性。如果您提供的信息是错误、虚假或不完整的，奇妙科技将终止您访问本服务任何部分或全部的权利。您同意奇妙科技在维护您的账户时和在奇妙科技隐私制度中详细列举的情形下可以存储和使用您所提供的注册资料。
          </p>
          <p>
            <b>
              6.用户账户和安全
            </b>
          </p>
          <ul>
            <li>
              a.账户和密码。作为本服务的注册用户，您可以收到或新建一个账户（“账户”）。您独自负责维护您的账户保密和安全。您不能将您的账户信息透露给其他人或使用其他人的账户。您对您账户的所有活动或通过您账户从事的所有活动负全部责任。您同意在您的账户出现任何非授权使用或任何其他违反安全性的行为时立即向奇妙科技报告。对由于非授权使用您的账户所导致的任何损失，奇妙科技不承担任何责任。
            </li>
            <li>
              b.安全。您了解本服务以及音频、视频和相关工艺图（“产品”）等通过本服务交易的产品包含安全框架，该安全框架所采用的技术可保护数字信息，并根据奇妙科技和其他内容供应商建立的特定使用规则（“使用规则”）限制您对产品的使用。您同意遵守这些使用规则，这些规则将在下面作进一步阐述。您不得使用除奇妙科技提供用于访问本服务的软件之外的手段访问本服务。您不得访问或试图访问您无权访问的账户。您同意不会为了包括获取本服务授权访问在内的任何目的通过任何手段或形式更改软件，或使用修订版本的软件。违反系统或网络安全将引发民事责任或刑事责任。
            </li>
          </ul>
          <b>
            7.奇妙科技产品的使用
          </b>
          <ul>
            <li>
              a.产品需求。您了解对奇妙科技的产品的使用会同时需要其他硬件和软件产品（例如，在物理媒介上拷贝产品的性能以及在未授权的数字播放设备上运行产品的性能），您将对这些硬件和软件负责。
            </li>
            <li>
              b.产品的使用。您确认产品包含的技术可限制您在下列可适用的使用规则范围内使用产品，无论产品是否受安全技术限制，您同意根据可适用的使用规则进行产品使用。
            </li>
            <li>
              <ul>
                <li>
                  （i）您对产品的使用以您已经接受本协议的条款为前提。
                </li>
                <li>
                  （ii）您有权使用仅供个人、非商业、娱乐用途的产品。
                </li>
                <li>
                  （iii）您有权在在您的个人电脑或者在装有安全保护程序的便携设备上使用产品。便携设备的安全保护程序必须具有：（a）微软1000的安全级别或者同等的安全级别；（b）没有无防护的数据输出。
                </li>
                <li>
                  （iv）您同意您不会试图、鼓励或协助他人规避或更改作为本服务一部分或用于管理使用规则的任何安全技术或软件。
                </li>
                <li>
                  （v）提供产品并不意味着向您转让了产品的任何商业、销售、转售、复制、分销或推销权利，包括无限制情况下需要同步、公共播放或机器授权的有关基础音乐作品的任何使用权利。
                </li>
                <li>
                  （vi）软件产品的使用规则遵守任何终端用户条款或该产品使用所需的其他条款和条件的规定。
                </li>
              </ul>
            </li>
            <li>
              c.您同意您对奇妙科技的使用意味着您接受并同意根据该使用规则从而使用该产品，并且同意对产品的其他任何方式的使用将构成版权侵犯。如果适用，安全技术是产品不可分割的一部分。您的产品权利应遵守您与其他方订立的任何其他条款以及使用规则的规定。奇妙科技有权随时更改使用规则。
            </li>
            <li>
              d.您确认本服务、产品的某些方面，以及使用规则的管理会一直涉及奇妙科技。因此，当奇妙科技根据其选择更改本服务的任何部分或中断本服务时，您确认您使用产品的范围不再与更改和中断前相同，并且确认在这种情况下奇妙科技对您不承担任何责任。
            </li>
          </ul>
          <p>
            <b>
              8.区域。
            </b>
          </p>
          <p>
            本服务仅限于中华人民共和国境内。您同意不会在有效区域外使用或试图使用本服务，并同意奇妙科技可使用技术验证您的一致性。
          </p>
          <p>
            <b>
              9.知识产权。
            </b>
          </p>
          <ul>
            <li>
              a.所有权确认。您同意奇妙科技和/或其内容提供商对本服务——包括但不限于产品、图形、游戏片断和编辑的内容——拥有所有权，且本服务受知识产权（包括但不限于版权）和其他相关法律的保护，并且您同意不会以本协议条款确认的的服务使用方式之外的任何方式去使用这些专利信息或资料。您同意不得以任何形式或任何方式复制本服务的任何部分，除非下文或可适用法律有明确的许可。您同意不会更改、租用、出租、借出、出售、分发或创建基于本服务的衍生作品，并且您不得以任何非授权的方式，包括但不限于侵害或负载网络容量，开发本服务。
            </li>
            <li>
              b.奇妙科技内容和其他资料的删除。不管本协议有其他任何规定，奇妙科技及其内容提供商都有权在不通知的情况下随时对组成本服务一部分的任何产品、内容或其他资料进行更改、中止、删除或禁止访问。根据本协议，奇妙科技不对删除或禁止访问这些产品承担任何责任。奇妙科技还可在任何情况下对本服务的特定功能或部分的使用和访问进行限制而不进行通知且无须承担责任。
            </li>
            <li>
              c.版权。本服务的版权，包括但不限于奇妙科技网站（包括内容编辑、帖子、与其他互联网资源的链接、对其他资源的描述）以及软件，归奇妙科技和/或其内容提供商所有，奇妙科技和/或其内容提供商保留法律和公平正义之原则赋予他们的权利。该软件或本服务任何部分的使用，除本服务条款所许可的，均是严格禁止的，且将构成侵犯他人的知识产权，并可能使您就版权侵犯承担民事或刑事赔偿，包括可能的金钱赔偿。
            </li>
            <li>
              d.商标。奇妙科技、奇妙科技标识及其他的奇妙科技商标、服务标志、图形和与本服务相关的标识均是奇妙科技在中华人民共和国和/或其他国家的商标或注册商标。其他商标、服务标志、图形、以及与本服务相关的标识可能是其各自所有者的商标。您不具有任何上述商标和使用这些商标的权利或许可。
            </li>
            <li>
              e.专辑封面艺术图。基于本服务账户拥有者的良好信誉，奇妙科技将根据可用性允许您有限制地下载存储于奇妙科技产品目录（Product Catalogue）中的特定软件。该访问权限的提供仅仅是为方便满足您的相关需求；对于这些专软件或者您对它们的使用，奇妙科技不提供保证或认可，也不承担或负有任何责任。您能访问音乐专辑封面艺术图（可用的范围内）仅限于您是该音乐合法复制品的合法持有者。提供的专辑封面艺术图仅限于个人的非商业使用。您同意您不会以可能侵犯或违反服务条款或任何其他方权利的方式使用专辑封面艺术图，并且同意奇妙科技不以任何方式对您的这些使用负责。
            </li>
          </ul>
          <p>
            <b>
              10.终止。
            </b>
          </p>
          <ul>
            <li>
              a.由奇妙科技终止。如果您未能遵守本协议的任何规定，或者奇妙科技怀疑您未能遵守本协议的任何规定，包括但不限于未能向奇妙科技提供正确和完整的注册资料、未能保护好您的账户信息、违反使用规则或任何软件许可证、或侵犯或其他违反第三方权利的行为，奇妙科技在不通知您的情况下将自行：（i）终止本协议和/或您的账户；（ii）终止软件许可证；和/或（iii）阻止对本服务（或其中任何部分）的访问。
            </li>
            <li>
              b.服务终止。奇妙科技有权在通知您或不通知您的情况下随时更改、中断或中止本服务（或其中任何的部分或内容），奇妙科技对您或实施该权利的第三方不承担任何责任。
            </li>
          </ul>
          <p>
            <b>
              11.一般性的法律遵守
            </b>
          </p>
          <p>
            奇妙科技通过其驻中华人民共和国的办事处管理和经营本服务。您同意遵守所有适用于本服务的国家的和地方的法律、法规和规章。
          </p>
          <p>
            <b>
              12.条款的实施。
            </b>
          </p>
          <p>
            奇妙科技有权为实施和/或验证与本协议任何部分的一致性采取其认为特别需要或合适的措施（包括但不限于，奇妙科技同与您使用本服务和/或产品相关的任何法律程序进行合作的权利、和/或第三方声明您对本服务和/或产品的使用为非法和/或侵犯了该第三方的权利）。您同意奇妙科技在对您不承担任何责任的情况下，有权向法律执行机关、政府官员和/或第三方披露任何注册信息和/或账户信息，因为奇妙科技认为这对于实施和/或验证与本协议任何部分的一致性是特别需要或合适的（包括但不限于，奇妙科技同与您使用本服务和/或产品相关的任何法律程序进行合作的权利、和/或第三方声明您对本服务和/或产品的使用为非法和/或侵犯了该第三方的权利）。
          </p>
          <p>
            <b>
              13.对第三方资料或网站的免责。
            </b>
          </p>
          <p>
            通过本服务获得的特定内容、产品和服务包括源自第三方的资料。此外，奇妙科技提供与特定第三方网站的链接。您确认并同意奇妙科技不对任何第三方资料或网站的内容或正确性的检查或评估承担任何责任。对于任何第三方资料或网站、或第三方任何其他资料、产品或服务，奇妙科技不提供保证或认可，也不承担或负有任何责任。与其他网站的链接仅仅是为了方便而向您提供的。您同意您不会以任何可能侵犯或违反任何其他方权利的方式使用任何第三方资料，并且同意奇妙科技不以任何方式对您的这些使用负责。
          </p>
          <p>
            <b>
              14.免除保证责任声明；责任限制
            </b>
          </p>
          <ul>
            <li>
              a.奇妙科技不保证、承诺或担保您对本服务的使用不间断或无差错，您同意奇妙科技会不时将不定时间段的服务移除，或者在不通知您的情况下随时取消本服务。
            </li>
            <li>
              b.您明确同意您对本服务的使用或无法使用本服务的风险均由您独自承担。在没有任何保证的情况下，我们将针对您的使用，根据“现状”和“可用性”提供本服务或者通过本服务获得的产品。
            </li>
            <li>
              c.奇妙科技及其董事、主管人员、员工、附属公司、代理公司、承包商或内容提供商在任何情况下均不对您在适用本服务任何部分的过程中造成的任何直接的、间接的、偶然的、惩罚性的、特殊的或导致的损害负任何责任。
            </li>
            <li>
              d.奇妙科技应采用合适的措施保护您所提交的与本服务相关的信息，但您确认并同意您对这些信息的提交独自承担责任，奇妙科技在此声明不承担对您的任何或所有损失的责任，以及以任何方式与这些信息相关的责任。
            </li>
            <li>
              e.奇妙科技不声明或保证本服务可免于丢失、舞弊、攻击、病毒、干涉、黑客入侵或其他安全入侵，奇妙科技不承担任何与此相关的责任。
            </li>
          </ul>
          <p>
            <b>
              15.豁免和赔偿。
            </b>
          </p>
          <p>
            通过使用本服务，您同意就您违反本协议，您对本服务的使用、或者奇妙科技在对违反本协议的可疑行为进行调查过程中或由于其发现或决定已出现违反本协议的行为后而采取的任何措施所导致的任何索赔，向奇妙科技及其董事、主管人员、员工、附属公司、代理公司、承包商以及内容承包商作出赔偿，使其免受损害。
          </p>
          <p>
            <b>
              16.更改。
            </b>
          </p>
          <p>
            奇妙科技有权随时或不时更新、修订、补充和更改本协议，并针对您对本服务的使用实施新的补充规则、策略、条款或条件。这些更新、修订、补充、更改以及附加的规则、策略、条款和条件（在本协议中统称为“附加条款”）将立即生效并并入本协议中。之后您对“奇妙加速器/奇妙网游加速器”服务的继续使用将被视为您已接受任何或所有的这些附加条款。在此按照这一基准将所有的附加条款并入本协议。
          </p>
          <p>
            <b>
              17.通知。
            </b>
          </p>
          <p>
            奇妙科技按照您在奇妙科技账户联系信息中所列的邮件地址以电子邮件信息的形式，或者按照您的奇妙科技账户联系信息中所列的联系地址通过邮寄发信的形式，或者在奇妙科技上以发帖的形式将与本服务有关的通知发送给您。通知应立即生效。
          </p>
          <p>
            <b>
              18.法律适用。
            </b>
          </p>
          <p>
            这些服务条款以及您对本服务的使用均遵守中华人民共和国法律的规定。您对本服务的使用还应遵守其他相关的地方法、国家法或国际法。您明确同意中华人民共和国法院对您对本服务的使用和奇妙科技相关的任何索赔和纠纷有专属管辖权。
          </p>
          <p>
            <b>
              19.其他。
            </b>
          </p>
          <p>
            这些服务条款构成了您与奇妙科技之间的全部协议，并取代您与奇妙科技之前达成的任何协议，您对本服务的使用必须遵守这些条款的规定。当您使用附属服务、第三方内容或第三方软件时，您还应遵守适用的附加条款和条件。如果这些服务条款的任何部分无效或不可执行，应以符合可适用法律的形式对该部分进行解释，以尽可能反映各方的原始意图，且其他部分仍具有完全效力。奇妙科技未能实施这些服务条款中的任何权利和规定不构成该规定的豁免，或者不构成这些服务条款的任何其他规定。如果具有有效管辖权的法院发现本协议的任何规定无效，其他规定仍具有完全效力。对于不可抗力导致的未能履行任何义务，奇妙科技对此不承担任何责任。
          </p>
        </div>
      </TabItem>
    </Tabs>
  );
}

export default App;
