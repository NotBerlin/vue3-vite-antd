import TIM from 'tim-js-sdk';

/*
 * @Author: dlAm 
 * @Date: 2021-09-28 14:50:10 
 * @Last Modified by: dlAm
 * @Last Modified time: 2021-09-28 15:27:41
 * @Power:  拉取群组信息
 * @Description:  
 * 群资料过滤器。除默认拉取的群资料外，指定需要额外拉取的群资料，支持的值如下：

  TIM.TYPES.GRP_PROFILE_OWNER_ID（群主 ID）
  TIM.TYPES.GRP_PROFILE_CREATE_TIME（群创建时间）
  TIM.TYPES.GRP_PROFILE_LAST_INFO_TIME（最后一次群资料变更时间）
  TIM.TYPES.GRP_PROFILE_MEMBER_NUM（群成员数量）
  TIM.TYPES.GRP_PROFILE_MAX_MEMBER_NUM（最大群成员数量）
  TIM.TYPES.GRP_PROFILE_JOIN_OPTION（申请加群选项）
  TIM.TYPES.GRP_PROFILE_INTRODUCTION（群介绍）
  TIM.TYPES.GRP_PROFILE_NOTIFICATION（群公告）
  TIM.TYPES.GRP_PROFILE_MUTE_ALL_MBRS (全体禁言设置) v2.6.2起支持
 */

export function getGroupList () {
  let promise = this.getGroupList({
    groupProfileFilter: [TIM.TYPES.GRP_PROFILE_OWNER_ID],
  });
  return promise;
}
