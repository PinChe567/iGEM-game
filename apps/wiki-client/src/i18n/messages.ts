import type { Locale } from './locale';

export type MessageTree = {
  meta: { title: string; description: string };
  shell: {
    brandTitle: string;
    brandSubtitle: string;
    homeAria: string;
    footerMark: string;
    footerTagline: string;
    langZh: string;
    langEn: string;
    langSwitchAria: string;
    skipToMain: string;
    navAria: string;
    legal: string;
    a11y: string;
    a11yTitle: string;
    highContrast: string;
    reducedMotion: string;
    a11yNote: string;
  };
  hub: {
    eyebrow: string;
    heading: string;
    lead: string;
    play: string;
    comingSoon: string;
    comingSoonHint: string;
    pathTitle: string;
    pathLead: string;
    explorerTitle: string;
    explorerLead: string;
    explorerLevel: string;
    explorerNotRank: string;
    duration: string;
    solo: string;
    concept: string;
    localProgress: string;
    gameLabel: string;
    games: {
      pixel: { title: string; blurb: string; duration: string; concept: string };
      game2: { title: string; blurb: string; duration: string; concept: string };
      game3: { title: string; blurb: string; duration: string; concept: string };
    };
  };
  legal: {
    title: string;
    close: string;
    tabsAria: string;
    tabScience: string;
    tabLimits: string;
    tabCredits: string;
    tabPrivacy: string;
    scienceTitle: string;
    scienceBody: string;
    limitsTitle: string;
    limitsBody: string;
    creditsTitle: string;
    creditsEmpty: string;
    privacyTitle: string;
    privacyBody: string;
  };
  pixelShell: {
    guide: string;
    soundToggle: string;
    soundOn: string;
    soundOff: string;
    backToHub: string;
  };
  pixel: Record<string, string>;
  labyrinth: Record<string, string>;
  spectrumShell: {
    guide: string;
  };
  spectrum: Record<string, string>;
  pages: {
    navTeam: string;
    navAttributions: string;
    navHumanPractices: string;
    navEducation: string;
    team: {
      title: string;
      lead: string;
      empty: string;
      emptyHint: string;
      contact: string;
      subteams: Record<string, string>;
      contribution: string;
      portraitPending: string;
    };
    attributions: {
      title: string;
      lead: string;
      embedMissing: string;
      embedMissingHint: string;
      embedInvalid: string;
      embedBlocked: string;
      iframeTitle: string;
      openOfficial: string;
      iframeFallback: string;
      supportTitle: string;
      supportEmpty: string;
    };
    humanPractices: {
      title: string;
      lead: string;
      empty: string;
      sections: Record<string, string>;
      loopLabels: Record<string, string>;
      noStakeholders: string;
      noEngagements: string;
      noDecisions: string;
      anonymized: string;
    };
    education: {
      title: string;
      lead: string;
      empty: string;
      status: Record<string, string>;
      fields: Record<string, string>;
      noResultsYet: string;
      downloads: string;
    };
  };
};

/** All zh-Hant strings use Unicode escapes so encoding stays stable on Windows. */
export const messages: Record<Locale, MessageTree> = {
  'zh-Hant': {
    meta: {
      title: '\u55c5\u89ba\u50cf\u7d20\u5957\u4ef6 \u00b7 iGEM',
      description: '\u4e09\u6b3e\u6c23\u5473\u6559\u80b2\u904a\u6232\u5957\u4ef6\u9996\u9801\u3002',
    },
    shell: {
      brandTitle: '\u55c5\u89ba\u50cf\u7d20',
      brandSubtitle: '\u55c5\u89ba\u50cf\u7d20\u5957\u4ef6',
      homeAria: '\u56de\u5230\u5957\u4ef6\u9996\u9801',
      footerMark: '\u55c5\u89ba\u50cf\u7d20\u5957\u4ef6 \u00b7 2026',
      footerTagline:
        '\u6c23\u5473\u4e0d\u662f\u5b64\u7acb\u7684\u9ede\uff0c\u800c\u662f\u4e00\u5f35\u5f7c\u6b64\u76f8\u9023\u7684\u5730\u5716\u3002',
      langZh: '\u7e41\u4e2d',
      langEn: 'EN',
      langSwitchAria: '\u5207\u63db\u8a9e\u8a00',
      skipToMain: '\u8df3\u81f3\u4e3b\u5167\u5bb9',
      navAria: '\u5957\u4ef6\u5c0e\u89bd',
      legal: '\u79d1\u5b78\uff0f\u8aee\u6b0a',
      a11y: '\u7121\u969c\u7919',
      a11yTitle: '\u7121\u969c\u7919\u8a2d\u5b9a',
      highContrast: '\u9ad8\u5c0d\u6bd4',
      reducedMotion: '\u6e1b\u5c11\u52d5\u756b',
      a11yNote: '\u50c5\u5132\u5b58\u65bc\u672c\u6a5f\uff0c\u4e0d\u6703\u4e0a\u50b3\u3002',
    },
    hub: {
      eyebrow: '\u55c5\u89ba\u50cf\u7d20\u5957\u4ef6',
      heading: '\u4e09\u6b3e\u6c23\u5473\u904a\u6232',
      lead: '\u9078\u4e00\u6b3e\u904a\u6232\u958b\u59cb\u73a9\u3002\u9032\u5ea6\u50c5\u4fdd\u5b58\u5728\u672c\u6a5f\u700f\u89bd\u5668\u3002',
      play: '\u9032\u5165\u904a\u6232',
      comingSoon: '\u958b\u767c\u4e2d',
      comingSoonHint: '\u5c1a\u672a\u958b\u653e\uff0c\u6309\u9215\u5df2\u505c\u7528\u3002',
      pathTitle: '\u5b78\u7fd2\u8def\u5f91',
      pathLead: '',
      explorerTitle: '\u63a2\u7d22\u7b49\u7d1a',
      explorerLead: '',
      explorerLevel: '\u672c\u6a5f\u7b49\u7d1a',
      explorerNotRank: '',
      duration: '\u9810\u4f30\u6642\u9593',
      solo: '\u55ae\u4eba',
      concept: '\u5b78\u7fd2\u6982\u5ff5',
      localProgress: '\u672c\u6a5f\u9032\u5ea6',
      gameLabel: '\u904a\u6232',
      games: {
        pixel: {
          title: '\u904a\u6232 1 \u00b7 \u5716\u6a23\u8fa8\u8b58',
          blurb: '\u89c0\u5bdf LED \u6c23\u5473\u7de8\u78bc\uff0c\u8fa8\u8b58\u5c0d\u61c9\u6c23\u5473\u3002',
          duration: '10\u201315 \u5206\u9418',
          concept: '\u5716\u6a23\u8fa8\u8b58',
        },
        game2: {
          title: '\u904a\u6232 2 \u00b7 \u8eab\u4efd\u8207\u8def\u5f91\u63a8\u7406',
          blurb: '\u5728\u865b\u69cb\u9598\u9580\u8ff7\u5bae\u6536\u8b49\u64da\uff0c\u63a8\u6e2c\u8eab\u4efd\u8207\u5e7b\u5f71\u3002',
          duration: '20\u201330 \u5206\u9418',
          concept: '\u8eab\u4efd\u8207\u8def\u5f91\u63a8\u7406',
        },
        game3: {
          title: '\u904a\u6232 3 \u00b7 \u6df7\u5408\u53cd\u63a8',
          blurb: '\u5f9e 12 \u901a\u9053\u8a0a\u865f\u53cd\u63a8\u6df7\u5408\u4f86\u6e90\u8207\u6bd4\u4f8b\u3002',
          duration: '15\u201325 \u5206\u9418',
          concept: '\u6df7\u5408\u53cd\u63a8',
        },
      },
    },
    legal: {
      title: '\u79d1\u5b78\uff0f\u6a21\u578b\uff0f\u8aee\u6b0a\uff0f\u96b1\u79c1',
      close: '\u95dc\u9589',
      tabsAria: '\u8aaa\u660e\u5206\u9801',
      tabScience: '\u79d1\u5b78',
      tabLimits: '\u6a21\u578b\u9650\u5236',
      tabCredits: '\u5a92\u9ad4\u4f86\u6e90',
      tabPrivacy: '\u96b1\u79c1',
      scienceTitle: '\u6559\u80b2\u793a\u610f\u6a21\u578b',
      scienceBody:
        '\u4e09\u6b3e\u904a\u6232\u90fd\u4f7f\u7528\u793a\u610f\u7528\u865b\u64ec\u53d7\u9ad4\uff0f\u865b\u69cb\u9598\u9580\u6a21\u578b\uff0c\u7528\u65bc\u5efa\u69cb\u5716\u6a23\u3001\u63a8\u7406\u8207\u6df7\u5408\u76f4\u89ba\uff0c\u4e0d\u662f\u5be6\u9a57\u6e2c\u91cf\u5831\u544a\u3002',
      limitsTitle: '\u6a21\u578b\u9650\u5236',
      limitsBody:
        '\u4e0d\u5f97\u5c07\u904a\u6232\u7d50\u679c\u89e3\u8b80\u70ba\u5be6\u969b\u6c23\u9ad4\u6fc3\u5ea6\u3001\u751f\u7269\u89aa\u548c\u6216\u5316\u5b78\u9451\u5b9a\u3002\u771f\u5be6\u6df7\u5408\u53ef\u80fd\u6709\u6297\u6297\uff0f\u589e\u5f37\uff1b\u6b64\u8655\u70ba\u7c21\u5316\u793a\u610f\u3002',
      creditsTitle: '\u5a92\u9ad4\u4f86\u6e90',
      creditsEmpty: '\u5c1a\u7121\u5df2\u767b\u8a18\u5a92\u9ad4\u3002',
      privacyTitle: '\u96b1\u79c1',
      privacyBody:
        '\u9032\u5ea6\u8207\u8a2d\u5b9a\u50c5\u5b58\u65bc\u700f\u89bd\u5668\u672c\u6a5f\u5132\u5b58\u3002\u4e0d\u6536\u96c6\u500b\u8cc7\u3001\u4e0d\u8a3b\u518a\u96e2\u7dda\u5de5\u4f5c\u7a0b\u5f0f\u3001\u4e0d\u547c\u53eb\u9060\u7aef API\u3002',
    },
    pixelShell: {
      guide: '\u904a\u6232\u8aaa\u660e',
      soundToggle: '\u5207\u63db\u97f3\u6548',
      soundOn: '\u958b\u555f\u97f3\u6548',
      soundOff: '\u95dc\u9589\u97f3\u6548',
      backToHub: '\u8fd4\u56de\u5957\u4ef6\u9996\u9801',
    },
    pixel: {
      title: '\u6c23\u5473\u50cf\u7d20\u5be6\u9a57\u5ba4',
      lead: '\u7528\u793a\u610f\u7528\u865b\u64ec\u53d7\u9ad4\u6a21\u5f0f\u8fa8\u8b58\u6c23\u5473\u7de8\u78bc\u3002',
      practice: '\u7df4\u7fd2\u6a21\u5f0f',
      daily: '\u6bcf\u65e5\u6311\u6230',
      startPractice: '\u958b\u59cb\u7df4\u7fd2',
      startDaily: '\u958b\u59cb\u6bcf\u65e5\u6311\u6230',
      randomizeSeed: '\u7522\u751f\u65b0\u7a2e\u5b50',
      settings: '\u96e3\u5ea6\u8a2d\u5b9a',
      matrixSize: '\u77e9\u9663\u5c3a\u5bf8',
      distractorBias: '\u5e72\u64fe\u9078\u9805\u504f\u5411',
      noise: '\u5e72\u64fe\u4f54\u672a\u4eae\u683c\u6bd4\u4f8b',
      studyReview: '\u5141\u8a31\u8907\u7fd2',
      displayMs: '\u5716\u6a23\u986f\u793a\u6642\u9593',
      yes: '\u662f',
      no: '\u5426',
      shown: '\u986f\u793a\u7684\u5716\u6a23',
      choose: '\u9019\u7d44\u7de8\u78bc\u662f\u54ea\u500b\u6c23\u5473\uff1f',
      noiseCount: '\u5be6\u969b\u5e72\u64fe\u683c\uff1a',
      next: '\u4e0b\u4e00\u984c',
      results: '\u7d50\u679c',
      replay: '\u91cd\u73a9\u540c\u4e00\u7a2e\u5b50',
      copySeed: '\u8907\u88fd\u7a2e\u5b50',
      copied: '\u5df2\u8907\u88fd',
      clearData: '\u6e05\u9664\u672c\u6a5f\u8cc7\u6599',
      shortcuts:
        '\u5feb\u6377\u9375\uff1a1\u20134 \u9078\u64c7\u3001Enter \u4e0b\u4e00\u984c\u3001Esc \u95dc\u9589\u8996\u7a97',
      science: '\u79d1\u5b78\u8aaa\u660e',
      assetCredit: '\u7d20\u6750\u8cc7\u8a0a',
      correct: '\u8fa8\u8b58\u6b63\u78ba\uff01',
      answer: '\u6b63\u78ba\u7b54\u6848',
      nearest: '\u6700\u63a5\u8fd1\u7684\u6c23\u5473',
      best: '\u6700\u9ad8\u5206',
    },
    labyrinth: {
      title: '\u6697\u57df\u55c5\u8e64',
      lead:
        '\u4f60\u7684\u76ee\u6a19\uff1a\u5728\u8ff7\u5bae\u88e1\u6536\u96c6\u8b49\u64da\uff0c\u63a8\u6e2c\u56db\u540d NPC \u7684\u6c23\u5473\u8eab\u4efd\uff0c\u4e26\u627e\u51fa\u8ab0\u662f\u5e7b\u5f71\u3002',
      objectiveTitle: '\u4f60\u8981\u505a\u4ec0\u9ebc\uff1f',
      objectiveBody:
        '1) WASD \u79fb\u52d5\uff0c\u6ed1\u9f20\u63a7\u624b\u96fb\u7b52\uff08\u7167\u4eae\u5340\u662f\u539f\u59cb\u5730\u5716\u4eae\u5ea6\uff0c\u4e0d\u662f\u9ec3\u8272\u906e\u7f69\uff09\u3002\n2) \u5730\u5716\u6709\u591a\u500b\u623f\u9593\uff1b\u5148\u627e\u9752\u8272\u300c\u6383\u63cf\u300d\uff0c\u9760\u8fd1\u6309 E\u3002\n3) NPC \u6703\u8d70\u52d5\uff1b\u82e5\u6709\u4eba\u51fa\u7d05\u5708\u8ffd\u4f60\uff0c\u8acb\u8eb2\u9583\uff08\u88ab\u6293\u5230\u6703\u77ed\u66ab\u505c\u6b62\uff09\u3002\n4) \u9760\u8fd1\u7da0\u9ede\u6309 E \u6216\u9ede\u300c\u77ed\u4efb\u52d9\u300d\u53ef\u591a\u62ff\u8b49\u64da\uff1b\u5920\u4e86\u5c31\u300c\u7d50\u675f\u63a2\u7d22\u300d\u53bb\u731c\u5e7b\u5f71\u3002',
      controlsHint:
        '\u64cd\u4f5c\uff1aWASD \u79fb\u52d5\u3001\u6ed1\u9f20\u7784\u6e96\u624b\u96fb\u7b52\u3001E/\u7a7a\u683c\u4e92\u52d5\u3001Esc \u66ab\u505c\u3002',
      pause: '\u66ab\u505c',
      resume: '\u7e7c\u7e8c',
      resumeHint: '\u7e7c\u7e8c\u524d\u6703\u5012\u6578\u3002Esc \u66ab\u505c\u3002',
      landscapeHint: '\u5efa\u8b70\u6a6b\u5411\uff08\u76f4\u5411\u4ecd\u53ef\u73a9\uff09',
      interact: '\u4e92\u52d5',
      interactDoor: '[E] \u958b/\u95dc\u9580\u4e26\u8b80\u53d6\u9580\u8a18\u9304',
      interactDoorOpened: '\u5df2\u958b\u9580',
      interactDoorClosed: '\u5df2\u95dc\u9580',
      interactTask: '[E] \u6aa2\u8996\u4efb\u52d9\u9ede',
      interactTaskHint: '\u9019\u662f\u4efb\u52d9\u9ede\u2014\u2014\u8acb\u6309\u53f3\u4e0a\u300c\u77ed\u4efb\u52d9\u300d\u958b\u59cb\u5c0f\u904a\u6232',
      interactGateOk: '[E] \u6aa2\u8996\u6b64\u9598\u9580\uff08\u4f60\u53ef\u901a\u904e\uff09',
      interactGateBlocked: '[E] \u6aa2\u8996\u6b64\u9598\u9580\uff08\u4f60\u4e0d\u80fd\u901a\u904e\uff09',
      interactScanner: '[E] \u8b80\u53d6\u6383\u63cf\u5668\u8b49\u64da',
      interactReview: '[E] \u6aa2\u8996\u5ba4',
      interactReviewHint: '\u6aa2\u8996\u5ba4\u2014\u2014\u8b49\u64da\u6536\u5920\u5f8c\u8acb\u6309\u300c\u7d50\u675f\u63a2\u7d22\u300d',
      interactNone: '\u9084\u6c92\u9760\u8fd1\u53ef\u4e92\u52d5\u7269\u4ef6\u3002\u5148\u627e\u9752\u8272\u300c\u6383\u63cf\u300d\u6a19\u8a18',
      interactGotEvidence: '\u53d6\u5f97\u8b49\u64da\uff01',
      interactGotEvidenceCount: '\u53d6\u5f97 {n} \u9805\u8b49\u64da\uff01',
      interactNoNewEvidence: '\u6b64\u8655\u6c92\u6709\u65b0\u8b49\u64da\uff08\u53ef\u80fd\u5df2\u8b80\u904e\uff09',
      aimPad: '\u7784\u6e96',
      nextStep: '\u4e0b\u4e00\u6b65',
      step1: '\u8d70\u5230\u9752\u8272\u300c\u6383\u63cf\u300d\u6a19\u8a18\uff0c\u6309 E',
      step2: '\u9760\u8fd1\u68d5\u8272\u9580\u6309 E\uff0c\u8b80\u9580\u8a18\u9304',
      step3: '\u8eb2\u9583\u7d05\u5708\u8ffd\u8e64\u8005\uff1b\u63a2\u7d22\u4e0d\u540c\u623f\u9593\u8207\u7da0\u9ede\u4efb\u52d9',
      step4: '\u6309\u300c\u7d50\u675f\u63a2\u7d22\u300d\u53bb\u731c NPC \u8eab\u4efd\u8207\u5e7b\u5f71',
      nextHintScanner: '\u5f80\u9752\u8272\u300c\u6383\u63cf\u300d\u6a19\u8a18\u8d70\uff0c\u9760\u8fd1\u5f8c\u6309 E \u6536\u8b49\u64da\u3002',
      nextHintDoor: '\u627e\u68d5\u8272\u9580\uff0c\u9760\u8fd1\u5f8c\u6309 E\u3002',
      nextHintExplore: '\u7e7c\u7e8c\u63a2\u7d22\u9598\u9580\u8207\u7da0\u9ede\uff08\u4efb\u52d9\uff09\uff0c\u6216\u6309\u300c\u77ed\u4efb\u52d9\u300d\u591a\u62ff\u8b49\u64da\u3002',
      nextHintReview: '\u8b49\u64da\u5dee\u4e0d\u591a\u4e86\u2014\u2014\u53ef\u4ee5\u6309\u300c\u7d50\u675f\u63a2\u7d22\u300d\u53bb\u731c\u7b54\u3002',
      mapLegend: '\u6a19\u8a18\uff1a\u9752\u8272\u83f1\u5f62=\u6383\u63cf\u3001\u68d5\u8272=\u9580\u3001\u7da0\u9ede=\u4efb\u52d9\u3001\u7d05\u5708=NPC \u6b63\u5728\u8ffd\u4f60\u3002\u5404\u623f\u9593\u5730\u677f\u82b1\u7d0b\u4e0d\u540c\uff1b\u624b\u96fb\u7b52\u5916\u5f88\u9ed1\u3002',
      room: '\u76ee\u524d\u623f\u9593',
      roleLabel: '\u4f60\u7684\u8eab\u4efd',
      seedLabel: '\u6848\u4ef6\u7a2e\u5b50',
      start: '\u958b\u59cb\u6848\u4ef6',
      replay: '\u91cd\u64ad\u4e0a\u4e00\u7a2e\u5b50',
      tutorial: '\u6559\u5b78',
      skipTutorial: '\u8df3\u904e\u6559\u5b78',
      next: '\u4e0b\u4e00\u6b65',
      science: '\u79d1\u666e\u5361',
      scienceTitle: '\u7d44\u5408\u5f0f\u6c23\u5473\u7c3d\u7ae0\uff08\u7c21\u5316\uff09',
      scienceBody:
        '\u9019\u662f\u7c21\u5316\u7684\u7d44\u5408\u5f0f\u6c23\u5473\u7c3d\u7ae0\u904a\u6232\u3002A\u2013F \u70ba\u865b\u69cb\u6a19\u8a18\uff0c\u4e0d\u662f\u6ffa\u5f0f\u5be6\u9a57\u53d7\u9ad4\u89aa\u548c\u3002\u4e09\u500b\u9598\u9580\u7d44\u5408\u50c5\u7528\u65bc\u63a8\u7406\u7df4\u7fd2\u3002',
      bestLabel: '\u6700\u4f73\u5206\u6578',
      briefing: '\u7c21\u5831',
      briefingLead:
        '\u4f60\u6709\u4e00\u500b\u6c23\u5473\u8eab\u4efd\uff08\u53ef\u901a\u904e\u5c0d\u61c9\u7684 A\u2013F \u9598\u9580\uff09\u3002\u56db\u540d NPC \u4e5f\u5404\u6709\u4e0d\u540c\u8eab\u4efd\uff1b\u5176\u4e2d\u4e00\u540d\u662f\u5e7b\u5f71\uff08\u53ef\u5077\u7a7f\u975e\u6cd5\u9598\u9580\u4e26\u7559\u4e0b\u8de1\u8e64\uff09\u3002',
      briefingPhantomHint:
        '\u55ae\u6a5f\u9996\u7248\uff1a\u5e7b\u5f71\u4e0d\u6703\u662f\u4f60\u3002\u6536\u8b49\u64da\u6642\u8981\u8eb2\u9583\u8ffd\u8e64\u8005\uff08\u7d05\u5708\uff09\uff1b\u88ab\u6293\u5230\u6703\u77ed\u66ab\u505c\u6b62\u3002\u6700\u5f8c\u5728\u63a8\u7406\u677f\u731c\u8eab\u4efd\u8207\u5e7b\u5f71\u3002',
      beginExplore: '\u9032\u5165\u8ff7\u5bae',
      startTask: '\u77ed\u4efb\u52d9',
      roomEnter: '\u9032\u5165\uff1a{room}',
      threatChase: '\u6709\u4eba\u5728\u8ffd\uff01\u5feb\u8eb2\uff01',
      threatCaught: '\u88ab\u6293\u5230\uff01\u77ed\u66ab\u7121\u6cd5\u79fb\u52d5\u2014\u2014\u5feb\u8dd1\uff01',
      interactTaskStart: '\u958b\u59cb\u77ed\u4efb\u52d9\uff08\u5b8c\u6210\u53ef\u591a\u62ff\u8b49\u64da\uff09',
      taskPatternTitle: '\u5716\u6a23\u914d\u5c0d',
      taskPatternHow: '\u4e0b\u65b9\u6709\u4e09\u500b\u7c3d\u7ae0\uff0c\u9ede\u9078\u8207\u76ee\u6a19\u5b8c\u5168\u76f8\u540c\u7684\u90a3\u500b\u3002',
      taskPatternTarget: '\u76ee\u6a19\u7c3d\u7ae0',
      taskPatternHint: '\u9078\u51fa\u76f8\u540c\u7c3d\u7ae0',
      taskRoutingTitle: '\u8a0a\u865f\u8def\u7531',
      taskRoutingHow: '\u5fc5\u9808\u4f9d\u5e8f\u9ede\uff1a1 \u2192 2 \u2192 3 \u2192 4\u3002\u9ede\u932f\u4e0d\u6703\u524d\u9032\uff0c\u8acb\u91cd\u8a66\u3002',
      taskRoutingOrder: '\u6309\u9375\u9806\u5e8f\uff1a1 \u2192 2 \u2192 3 \u2192 4',
      taskRoutingProgress: '\u4e0b\u4e00\u500b\u61c9\u8a72\u6309\uff1a{cur} / {total}',
      taskHoldTitle: '\u6821\u6e96\u9577\u6309',
      taskHoldHow: '\u6309\u4f4f\u4e0b\u65b9\u6309\u9215\uff08\u6216\u7a7a\u683c\uff09\u4e0d\u653e\uff0c\u76f4\u5230\u9032\u5ea6\u6eff\u3002',
      taskHoldTip: '\u6309\u4f4f\u4e0d\u653e\uff1b\u653e\u958b\u6703\u91cd\u7f6e\u9032\u5ea6',
      taskHoldProgress: '\u6821\u6e96\u9032\u5ea6 {pct}%',
      taskMemoryTitle: '\u8a18\u61b6\u9806\u5e8f',
      taskMemoryHow: '\u5148\u8a18\u4f4f\u4e2d\u9593\u986f\u793a\u7684\u6578\u5b57\u5e8f\u5217\uff1b\u6d88\u5931\u5f8c\u4f9d\u5e8f\u9ede\u6309\u9215\u3002',
      taskMemoryWatch: '\u8a18\u4f4f\u9019\u4e32\u6578\u5b57\u2026',
      taskMemoryInput: '\u5df2\u8f38\u5165 {n} / {total}',
      taskTimer: '\u5269\u9918 {s} \u79d2',
      taskWrong: '\u4e0d\u5c0d\uff0c\u8acb\u518d\u8a66\u4e00\u6b21\u3002',
      taskOk: '\u77ed\u4efb\u52d9\u5b8c\u6210\uff01\u53d6\u5f97\u8b49\u64da\u3002',
      advancePhase: '\u7d50\u675f\u63a2\u7d22\uff0c\u53bb\u6aa2\u8996',
      evidenceCount: '\u5df2\u53d6\u5f97\u8b49\u64da',
      solutionUnique: '\u76ee\u524d\u8b49\u64da\u4e0b\u50c5\u5269\u4e00\u7d44\u89e3\u3002',
      solutionMultiple:
        '\u76ee\u524d\u4ecd\u6709\u591a\u7d44\u53ef\u80fd\uff08{n}\uff09\uff0c\u5c1a\u7121\u552f\u4e00\u7b54\u6848\u2014\u2014\u8acb\u7e7c\u7e8c\u6536\u8b49\u64da\u3002',
      review: '\u6aa2\u8996',
      verdict: '\u6700\u7d42\u5224\u5b9a',
      evidence: '\u8b49\u64da',
      statements: 'NPC \u9673\u8ff0\uff08\u771f\u5be6\u4f46\u4e0d\u5b8c\u6574\uff09',
      board: '\u63a8\u7406\u677f',
      boardHint:
        '\u7528\u4e0b\u62c9\u9078\u55ae\uff08\u53ef\u9375\u76e4\u64cd\u4f5c\uff09\u70ba\u6bcf\u4f4d NPC \u9078\u6c23\u5473\uff0c\u518d\u9078\u51fa\u5e7b\u5f71\u3002',
      pickPhantom: '\u6307\u63a7\u5e7b\u5f71 NPC',
      continue: '\u7e7c\u7e8c',
      submitVerdict: '\u63d0\u4ea4\u5224\u5b9a',
      noEvidence: '\u5c1a\u7121\u8b49\u64da\u3002',
      debrief: '\u8907\u76e4',
      phantom: '\u5e7b\u5f71',
      truth: '\u771f\u76f8',
      guess: '\u4f60\u7684\u5224\u5b9a',
      scoreCase: '\u6848\u4ef6\u7834\u89e3',
      scoreOdor: '\u8eab\u4efd\u6307\u6d3e',
      scoreEvidence: '\u8b49\u64da\u6536\u96c6',
      scoreTime: '\u6642\u9593',
      scoreTotal: '\u7e3d\u5206',
      backMenu: '\u56de\u9078\u55ae',
      taskPattern: '\u5716\u6a23\u914d\u5c0d\uff1a\u9078\u64c7\u76f8\u7b26\u7c3d\u7ae0\uff081\u20133\uff09\u3002',
      taskRouting: '\u8a0a\u865f\u8def\u7531\uff1a\u4f9d\u5e8f\u6309\u7bc0\u9ede 1\u20134\u3002',
      taskHold: '\u6821\u6e96\u9577\u6309\uff1a\u9577\u6309\u7a7a\u683c\u9375\uff0f\u6309\u9215\u3002',
      taskHoldBtn: '\u6309\u4f4f',
      taskMemory: '\u8a18\u61b6\u9806\u5e8f\uff1a\u8a18\u61b6\u5f8c\u8f38\u5165\u5e8f\u5217\u3002',
      taskAbort: '\u4e2d\u65b7\u4efb\u52d9',
      tutorial_move:
        '\u4f7f\u7528 WASD / \u65b9\u5411\u9375\u79fb\u52d5\uff1b\u89f8\u63a7\u7528\u5de6\u5074\u6416\u687f\u3002',
      tutorial_flashlight:
        '\u7528\u6ed1\u9f20\u6216\u53f3\u5074\u7784\u6e96\u5340\u76ee\u6a19\u624b\u96fb\u7b52\uff1b\u7246\u58c1\u6703\u906e\u649e\u5149\u7dda\u3002',
      tutorial_gates:
        '\u9598\u9580 A\u2013F \u50c5\u5c0d\u61c9\u5408\u6cd5\u8eab\u4efd\u958b\u555f\uff08\u5b57\u6bcd + \u5f62\u72c0\uff09\u3002',
      tutorial_artifact:
        '\u5e7b\u5f71\u4ee5\u77ed\u66ab\u7a7f\u8d8a\u975e\u6cd5\u9598\u9580\u6703\u7559\u4e0b\u53ef\u6383\u63cf\u7684\u8de1\u8e64\u3002',
      tutorial_doorLog:
        '\u5728\u9580 / \u6383\u63cf\u5668\u9644\u8fd1\u6309 E \u53ef\u8b80\u53d6\u9580\u8a18\u9304\u8207\u983b\u9053\u7dda\u7d22\u3002',
      tutorial_board:
        '\u6aa2\u8996\u6642\u5728\u63a8\u7406\u677f\u70ba\u6bcf\u4f4d NPC \u9078\u6c23\u5473\uff0c\u4e26\u9078\u51fa\u5e7b\u5f71\u3002',
      stmt_saw_gate: '{npc} \u8868\u793a\u66fe\u4f7f\u7528\u9598\u9580 {gate}\u3002',
      stmt_worked_task: '{npc} \u8868\u793a\u66fe\u5728 {task} \u9644\u8fd1\u4f5c\u696d\u3002',
      stmt_heard_door: '{npc} \u807d\u5230\u9580\u72c0\u614b\u8b8a\u5316\u3002',
      stmt_no_artifact: '{npc} \u8868\u793a\u672a\u7559\u4e0b\u8de1\u8e64\u3002',
      stmt_visited_central: '{npc} \u66fe\u51fa\u73fe\u5728\u4e2d\u592e\u5eca\u9053\u3002',
      exploreGoal:
        '\u76ee\u6a19\uff1a\u6536\u8b49\u64da \u2192 \u7d50\u675f\u63a2\u7d22 \u2192 \u731c NPC \u8eab\u4efd\u8207\u5e7b\u5f71\u3002',
    },
    spectrumShell: {
      guide: '\u904a\u6232\u8aaa\u660e',
    },
    spectrum: {
      lead: '\u5f9e 12 \u901a\u9053\u865b\u64ec\u53d7\u9ad4\u8a0a\u865f\u53cd\u63a8\u6df7\u5408\u4f86\u6e90\u8207\u6574\u6578\u6bd4\u4f8b\uff08\u793a\u610f\u6a21\u578b\uff09\u3002',
      chooseRun: '\u9078\u64c7\u4e00\u5c40',
      science: '30 \u79d2\u79d1\u666e',
      scienceTitle: '\u6df7\u5408\u53ef\u80fd\u6709\u6297\u6297\uff0f\u589e\u5f37',
      scienceBody:
        '\u771f\u5be6\u6df7\u5408\u53ef\u80fd\u51fa\u73fe antagonism\uff08\u6297\u6297\uff09\u6216 enhancement\uff08\u589e\u5f37\uff09\uff0c\u56e0\u6b64\u672c\u904a\u6232\u7684\u7dda\u6027\uff0f\u98fd\u548c\u6a21\u578b\u50c5\u662f\u7c21\u5316\u793a\u610f\u3002\u89e3\u51fa\u7b54\u6848\u4e0d\u7b49\u65bc\u6e2c\u51fa\u5be6\u969b\u6c23\u9ad4\u6fc3\u5ea6\uff0c\u4e5f\u4e0d\u662f\u5316\u5b78\u9451\u5b9a\u4fe1\u5fc3\u3002',
      contrastOn: '\u9ad8\u5c0d\u6bd4\uff1a\u958b',
      contrastOff: '\u9ad8\u5c0d\u6bd4\uff1a\u95dc',
      close: '\u95dc\u9589',
      guideTitle: '\u5982\u4f55\u73a9',
      guide1: '\u89c0\u5bdf\u76ee\u6a19 12 channel \u8a0a\u865f\uff08\u9ede\uff0f\u67f1 + \u9023\u7dda\uff09\u3002',
      guide2: '\u8abf\u6574\u6c23\u5473\u6c60\u5404\u9805\u6bd4\u4f8b\uff08\u7e3d\u548c=100\uff09\uff1b0% = \u672a\u9078\u7528\u8a72\u6c23\u5473\u3002',
      guide3: '\u6bcf\u6b21\u63d0\u4ea4\u770b nA mB\u8207\u8a0a\u865f\u5438\u5408\u5ea6\u3002A=\u53c3\u8207\u6c23\u5473\u6fc3\u5ea6\u5b8c\u5168\u6b63\u78ba\uff1bB=\u6709\u9078\u5230\u4f46\u6fc3\u5ea6\u932f\u3002\u5b8c\u7f8e\u89e3=kA0B\uff08k=\u771f\u76f8\u6210\u5206\u6578\uff09\u3002',
      axisNote:
        'X \u8ef8\u70ba\u865b\u64ec\u53d7\u9ad4\uff0f\u901a\u9053\uff1bY \u8ef8\u70ba\u76f8\u5c0d\u53cd\u61c9\u3002\u9023\u7dda\u50c5\u5e6a\u52a9\u95b1\u8b80\uff0c\u4e0d\u662f\u6642\u9593\u6ce2\u3002',
      practice: '\u7df4\u7fd2',
      daily: '\u6bcf\u65e5\u6311\u6230',
      settings: '\u8a2d\u5b9a',
      difficulty: '\u96e3\u5ea6',
      diffEasy: '\u7c21\u55ae',
      diffHard: '\u56f0\u96e3',
      diffEasyHint: '\u7c21\u55ae\uff1a6 \u7a2e\u6c23\u5473\u3001\u986f\u793a\u7c3d\u540d\u793a\u610f\u5716\u8207\u6df7\u5408\u7a2e\u6578\uff0c\u4e26\u7e2e\u6e1b\u5019\u9078\u3002',
      diffHardHint: '\u56f0\u96e3\uff1a10 \u7a2e\u6c23\u5473\u3001\u4ecd\u6709\u7c3d\u540d\u793a\u610f\u5716\uff0c\u4f46\u4e0d\u544a\u8a34\u6df7\u5408\u7a2e\u6578\u3002',
      seed: '\u7a2e\u5b50',
      randomizeSeed: '\u96a8\u6a5f\u7a2e\u5b50',
      dailyNote:
        '\u6bcf\u65e5\u6311\u6230\u4f7f\u7528 UTC \u65e5\u671f\u7a2e\u5b50\u3002\u9019\u662f\u672c\u6a5f\u6311\u6230\uff0c\u4e0d\u662f\u9632\u4f5c\u5f0a\u4e16\u754c\u699c\u3002',
      best: '\u672c\u6a5f\u6700\u4f73',
      scoreScope: '\u50c5\u5728\u76f8\u540c\u96e3\u5ea6\u8207\u898f\u5247\u7248\u672c\u5167\u6bd4\u8f03',
      reducedMotion: '\u6e1b\u5c11\u52d5\u756b',
      clearData: '\u6e05\u9664\u672c\u6a5f\u8cc7\u6599',
      replayTutorial: '\u91cd\u770b\u6559\u5b78',
      readyLead: '\u9078\u597d\u6a21\u5f0f\u8207\u96e3\u5ea6\u5f8c\u958b\u59cb\u3002\u8996\u89ba\u5316\u5668\u4e0d\u6703\u5728\u754c\u9762\u91cd\u7b97 A/B \u6216\u5206\u6578\u3002',
      factOdors: '\u6c23\u5473\u6578',
      factComponents: '\u6210\u5206\u6578',
      factStep: '\u6bd4\u4f8b\u6b65\u9032',
      factGuesses: '\u731c\u6e2c\u6b21\u6578',
      factModel: '\u6df7\u5408\u6a21\u578b',
      startPractice: '\u958b\u59cb\u7df4\u7fd2',
      startDaily: '\u958b\u59cb\u6bcf\u65e5\u6311\u6230',
      tutorial: '\u6559\u5b78',
      skipTutorial: '\u8df3\u904e\u6559\u5b78',
      next: '\u4e0b\u4e00\u6b65',
      back: '\u4e0a\u4e00\u6b65',
      startPlay: '\u958b\u59cb\u89e3\u78bc',
      tut1Title: '\u55ae\u4e00\u4f86\u6e90\u5716\u6a23',
      tut1Body: '\u6bcf\u7a2e\u6c23\u5473\u5728 12 \u500b\u865b\u64ec\u53d7\u9ad4\u901a\u9053\u4e0a\u6709\u793a\u610f\u7c3d\u540d\u3002',
      tut2Title: '\u6df7\u5408\u8a0a\u865f',
      tut2Body: '\u6bd4\u4f8b\u52a0\u6b0a\u5f8c\uff08\u53ef\u518d\u7d93\u98fd\u548c\uff09\u5f62\u6210\u76ee\u6a19\u8a0a\u865f\u66f2\u7dda\u3002',
      tut3Title: '\u53cd\u63a8\u4f86\u6e90\u8207\u6bd4\u4f8b',
      tut3Body: '\u7528 A/B \u8207\u8a0a\u865f\u5438\u5408\u5ea6\u6536\u7a83\u7a84\u53ef\u80fd\u7b54\u6848\u3002',
      xAxis: '\u865b\u64ec\u53d7\u9ad4\uff0f\u901a\u9053',
      yAxis: '\u76f8\u5c0d\u53cd\u61c9',
      chartAria: '12 \u901a\u9053\u53cd\u61c9\u5716',
      remaining: '\u5269\u9918\u6b21\u6578',
      targetSignal: '\u76ee\u6a19\u8a0a\u865f',
      builder: '\u731c\u6e2c\u7d44\u5408',
      poolSelect: '\u8abf\u6574\u5404\u6c23\u5473\u6bd4\u4f8b\uff080% = \u672a\u9078\u7528\uff09',
      mixCountReveal: '\u771f\u76f8\u6df7\u5408\u7a2e\u6578',
      signatureHint: '\u7c3d\u540d\u793a\u610f',
      candidatesLeft: '\u5269\u9918\u5019\u9078\u6df7\u5408',
      candidateOdors: '\u53ef\u80fd\u6c23\u5473',
      componentCount: '\u6210\u5206\u6578',
      odor: '\u6c23\u5473',
      percent: '\u6bd4\u4f8b %',
      sum: '\u7e3d\u548c',
      sumNeed100: '\u9808\u7b49\u65bc 100 \u624d\u53ef\u63d0\u4ea4',
      autofill: '\u81ea\u52d5\u88dc\u8db3\u5269\u9918\u6bd4\u4f8b',
      autofillOk: '\u5df2\u5c07 {odor} \u5f9e {from}% \u8abf\u6574\u70ba {to}%\uff0c\u4f7f\u7e3d\u548c=100\u3002',
      autofillFail: '\u7121\u6cd5\u5728\u4e0d\u52d5\u5176\u4ed6\u69fd\u4f4d\u4e0b\u88dc\u8db3\u70ba\u5408\u6cd5\u6bd4\u4f8b\u3002',
      submit: '\u63d0\u4ea4\u731c\u6e2c',
      signalFit: '\u8a0a\u865f\u5438\u5408\u5ea6',
      abBlind: 'A=\u53c3\u8207\u6c23\u5473\u6fc3\u5ea6\u5b8c\u5168\u6b63\u78ba\uff1bB=\u6709\u9078\u5230\u4f46\u6fc3\u5ea6\u932f\u3002\u4e0d\u8a08\u975e\u53c3\u8207\u6c23\u5473\u3002\u5b8c\u7f8e\u89e3=kA0B\u3002',
      targetCurve: '\u76ee\u6a19\u66f2\u7dda',
      guessCurve: '\u731c\u6e2c\u66f2\u7dda',
      residual: '\u6b98\u5dee',
      history: '\u6b77\u53f2\u7d00\u9304',
      guess: '\u731c\u6e2c',
      noHistory: '\u5c1a\u7121\u7d00\u9304',
      solved: '\u89e3\u78bc\u6210\u529f\uff01',
      failed: '\u6b21\u6578\u7528\u5b8c\u2014\u2014\u63ed\u66c9\u771f\u76f8',
      truth: '\u771f\u76f8',
      guessScore: '\u731c\u6e2c\u5206',
      timeScore: '\u6642\u9593\u5206',
      totalScore: '\u7e3d\u5206',
      elapsed: '\u7528\u6642',
      guessesUsed: '\u4f7f\u7528\u6b21\u6578',
      channelContribution: '\u5404\u901a\u9053\u8ca2\u737b\uff08\u7dda\u6027\uff09',
      satCompare: '\u98fd\u548c\u524d\u5f8c\u5dee\u7570',
      linear: '\u7dda\u6027',
      saturated: '\u98fd\u548c',
      observed: '\u89c0\u6e2c',
      noiseDisclaimer:
        '\u5c08\u5bb6\u6a21\u5f0f\u7684\u7a2e\u5b50\u96dc\u8a0a\u662f\u904a\u6232\u898f\u5247\u64f4\u6563\uff0c\u4e0d\u662f\u771f\u5be6\u5316\u5b78\uff0f\u50b3\u611f\u5668\u96dc\u8a0a\u3002',
      playAgain: '\u518d\u73a9\u4e00\u5c40',
      backSetup: '\u56de\u8a2d\u5b9a',
    },
    pages: {
      navTeam: '\u5718\u968a',
      navAttributions: '\u81f4\u8b1d',
      navHumanPractices: '\u4eba\u6587\u5be6\u8e10',
      navEducation: '\u6559\u80b2',
      team: {
        title: '\u5718\u968a',
        lead: '\u6210\u54e1\u8cc7\u6599\u7531\u5718\u968a\u63d0\u4f9b\uff1b\u672a\u63d0\u4f9b\u524d\u4e0d\u986f\u793a\u540d\u55ae\u3002',
        empty: '\u5c1a\u672a\u5c0e\u5165\u9a57\u8b49\u904e\u7684\u5718\u968a\u540d\u55ae\u3002',
        emptyHint:
          '\u8acb\u5728 team catalog \u586b\u5165 name\u3001role\u3001subteam\u3001contribution\u3001portrait \u7b49\u6b04\u4f4d\u3002\u4e0d\u8981\u5c07 proposal \u63d0\u6848\u4eba\u81ea\u52d5\u7576\u4f5c\u6700\u7d42 roster\u3002',
        contact: '\u806f\u7d61',
        subteams: {
          'wet-lab': 'Wet Lab',
          'dry-lab': 'Dry Lab',
          hardware: 'Hardware',
          'human-practices': 'Human Practices',
          wiki: 'Wiki',
          advisors: 'Advisors',
          other: 'Other',
        },
        contribution: '\u8ca2\u737b\u6458\u8981',
        portraitPending: '\u7167\u7247\u5f85\u88dc',
      },
      attributions: {
        title: 'Attributions',
        lead: '\u5b98\u65b9 iGEM attributions \u5d4c\u5165\u9801\uff1bURL \u9808\u7531\u5718\u968a\u78ba\u8a8d\u5f8c\u586b\u5165 site.json\u3002',
        embedMissing: '\u5c1a\u672a\u8a2d\u5b9a attributionsEmbedUrl\u3002',
        embedMissingHint:
          '\u8acb\u5728 apps/wiki-client/site.json \u586b\u5165\u5718\u968a\u78ba\u8a8d\u7684 igem.org / igem.wiki \u5b98\u65b9 URL\u3002\u672a\u586b\u6642\u4e0d\u6703\u767c\u51fa\u4efb\u4f55\u8acb\u6c42\u3002',
        embedInvalid: 'attributionsEmbedUrl \u683c\u5f0f\u7121\u6548\u3002',
        embedBlocked: 'URL hostname \u4e0d\u5728\u5141\u8a31\u6e05\u55ae\uff08\u50c5 igem.org / igem.wiki\uff09\u3002',
        iframeTitle: 'Official iGEM attributions',
        openOfficial: 'Open official attributions in a new page',
        iframeFallback:
          '\u82e5 iframe \u7121\u6cd5\u8f09\u5165\uff0c\u8acb\u4f7f\u7528\u4e0a\u65b9\u9023\u7d50\u5728\u65b0\u5206\u9801\u958b\u555f\u5b98\u65b9 attributions\u3002',
        supportTitle: '\u5176\u4ed6\u81f4\u8b1d',
        supportEmpty: '\u5c1a\u7121\u5718\u968a\u63d0\u4f9b\u7684\u9644\u52a0\u81f4\u8b1d\u6587\u5b57\uff08\u4e0d\u5f97\u8207\u5b98\u65b9 attribution \u77db\u76fe\uff09\u3002',
      },
      humanPractices: {
        title: 'Human Practices',
        lead: 'Integration Loop\uff1a\u554f\u984c\u2192\u807d\u898b\u2192\u6d1e\u898b\u2192\u6c7a\u7b56\u2192\u6539\u8b8a\u2192\u8b49\u64da\u2192\u8ffd\u8e64\u3002\u50c5\u4f7f\u7528\u771f\u5be6\u7d00\u9304\u8207\u7d93\u540c\u610f\u5f15\u8a00\u3002',
        empty: '\u5c1a\u672a\u5c0e\u5165\u9a57\u8b49\u904e\u7684 engagement / stakeholder \u8cc7\u6599\u3002',
        sections: {
          approach: 'Our approach',
          landscape: 'Stakeholder landscape',
          needFinding: 'Need finding',
          decisions: 'Integrated decisions',
          ethics: 'Ethics and responsibility',
          changed: 'How Human Practices changed Wet Lab / Model / Hardware',
          limitations: 'Limitations and missing voices',
          next: 'Next steps',
        },
        loopLabels: {
          question: 'Question asked',
          heard: 'What we heard',
          insight: 'Insight',
          decision: 'Project decision',
          change: 'Concrete change',
          evidence: 'Evidence of change',
          followUp: 'Follow-up / evaluation',
          impact: 'Project impact',
        },
        noStakeholders: '\u5c1a\u7121 stakeholder map \u8cc7\u6599\u3002',
        noEngagements: '\u5c1a\u7121 engagement records\u3002',
        noDecisions: '\u5c1a\u7121 decision timeline\u3002',
        anonymized: '\u533f\u540d\uff08\u5df2\u8a18\u8f09\u7406\u7531\uff09',
      },
      education: {
        title: 'Education',
        lead: '\u6bcf\u9805\u6d3b\u52d5\u9700\u542b\u5b78\u7fd2\u76ee\u6a19\u3001\u8a55\u4f30\u8207\u53cd\u994b\u5f8c\u8b8a\u66f4\u3002\u7981\u6b62\u7522\u751f\u5b78\u751f\u5f15\u8a00\u6216\u6210\u6548\u767e\u5206\u6bd4\u3002',
        empty: '\u5c1a\u672a\u5c0e\u5165\u6559\u80b2\u6d3b\u52d5\u7d00\u9304\u3002',
        status: {
          planned: 'Planned',
          'in-progress': 'In progress',
          completed: 'Completed',
        },
        fields: {
          audience: 'Audience and needs',
          objectives: 'Learning objectives',
          codesign: 'Co-design / adaptation',
          materials: 'Materials',
          activity: 'Activity',
          safety: 'Safety / inclusivity / accessibility',
          evaluation: 'Evaluation method',
          results: 'Results',
          changed: 'What changed after feedback',
          downloads: 'Reusable downloads',
          license: 'License',
        },
        noResultsYet: '\u5c1a\u7121\u5718\u968a\u63d0\u4f9b\u7684\u8a55\u4f30\u7d50\u679c\uff08planned / in-progress\uff09\u3002',
        downloads: '\u53ef\u518d\u4f7f\u7528\u4e0b\u8f09',
      },
    },
  },
  en: {
    meta: {
      title: 'Odor Pixel Suite \u00b7 iGEM',
      description: 'Hub for three educational scent games.',
    },
    shell: {
      brandTitle: 'Odor Pixel',
      brandSubtitle: 'ODOR PIXEL SUITE',
      homeAria: 'Back to suite home',
      footerMark: 'ODOR PIXEL SUITE \u00b7 2026',
      footerTagline: 'A scent is not a single point \u2014 it is a connected map.',
      langZh: '\u7e41\u4e2d',
      langEn: 'EN',
      langSwitchAria: 'Switch language',
      skipToMain: 'Skip to main content',
      navAria: 'Suite navigation',
      legal: 'Science / Credits',
      a11y: 'Accessibility',
      a11yTitle: 'Accessibility settings',
      highContrast: 'High contrast',
      reducedMotion: 'Reduced motion',
      a11yNote: 'Stored on this device only ? nothing is uploaded.',
    },
    hub: {
      eyebrow: 'ODOR PIXEL SUITE',
      heading: 'Three scent games',
      lead: 'Pick a game to play. Progress stays in this browser only.',
      play: 'Play',
      comingSoon: 'Coming soon',
      comingSoonHint: 'Not available yet \u2014 this control is disabled.',
      pathTitle: 'Learning path',
      pathLead: '',
      explorerTitle: 'Explorer Level',
      explorerLead: '',
      explorerLevel: 'Local level',
      explorerNotRank: '',
      duration: 'Est. time',
      solo: 'Solo',
      concept: 'Learning concept',
      localProgress: 'Local progress',
      gameLabel: 'GAME',
      games: {
        pixel: {
          title: 'Game 1 \u00b7 Pattern Recognition',
          blurb: 'Read LED scent codes and identify the matching odor.',
          duration: '10\u201315 min',
          concept: 'Pattern Recognition',
        },
        game2: {
          title: 'Game 2 \u00b7 Identity & Path Deduction',
          blurb: 'Gather evidence in a fictional gate labyrinth and find the phantom.',
          duration: '20\u201330 min',
          concept: 'Identity & Path Deduction',
        },
        game3: {
          title: 'Game 3 \u00b7 Mixture Inference',
          blurb: 'Infer illustrative sources and ratios from a 12-channel mixture signal.',
          duration: '15\u201325 min',
          concept: 'Mixture Inference',
        },
      },
    },
    legal: {
      title: 'Science / Model / Credits / Privacy',
      close: 'Close',
      tabsAria: 'Information sections',
      tabScience: 'Science',
      tabLimits: 'Model Limits',
      tabCredits: 'Media Credits',
      tabPrivacy: 'Privacy',
      scienceTitle: 'Educational illustrative models',
      scienceBody:
        'All three games use illustrative virtual-receptor / fictional-gate models to teach pattern reading, deduction, and mixture intuition ? not experimental measurement reports.',
      limitsTitle: 'Model limits',
      limitsBody:
        'Do not interpret game outcomes as real gas concentrations, biological affinities, or chemical identification. Real mixtures may show antagonism/enhancement; this suite uses simplified illustrations.',
      creditsTitle: 'Media credits',
      creditsEmpty: 'No media entries registered yet.',
      privacyTitle: 'Privacy',
      privacyBody:
        'Progress and settings stay in browser localStorage only. No personal data collection, no Service Worker registration, and no remote API calls.',
    },
    pixelShell: {
      guide: 'How to play',
      soundToggle: 'Toggle sound',
      soundOn: 'Unmute sound',
      soundOff: 'Mute sound',
      backToHub: 'Back to suite home',
    },
    pixel: {
      title: 'Odor Pixel Lab',
      lead: 'Identify odor codes using an illustrative virtual-receptor model.',
      practice: 'Practice',
      daily: 'Daily challenge',
      startPractice: 'Start practice',
      startDaily: 'Start daily challenge',
      randomizeSeed: 'Randomize seed',
      settings: 'Difficulty settings',
      matrixSize: 'Matrix size',
      distractorBias: 'Distractor bias',
      noise: 'Noise as share of OFF cells',
      studyReview: 'Allow study review',
      displayMs: 'Pattern display time',
      yes: 'Yes',
      no: 'No',
      shown: 'Shown pattern',
      choose: 'Which odor is this code?',
      noiseCount: 'Noise cells:',
      next: 'Next',
      results: 'Results',
      replay: 'Replay same seed',
      copySeed: 'Copy seed',
      copied: 'Copied',
      clearData: 'Clear local data',
      shortcuts: 'Shortcuts: 1-4 choose, Enter next, Esc close dialogs',
      science: 'Science note',
      assetCredit: 'Asset credit',
      correct: 'Correct!',
      answer: 'Answer',
      nearest: 'Nearest odor',
      best: 'Best',
    },
    labyrinth: {
      title: 'Scentbound Labyrinth',
      lead: 'Your goal: gather evidence, deduce each NPC odor identity, and find the phantom.',
      objectiveTitle: 'What should I do?',
      objectiveBody:
        '1) WASD to move; mouse aims the flashlight (lit area = original map brightness, not a yellow overlay).\n2) Multiple rooms — start at the cyan SCAN marker, press E.\n3) NPCs patrol; if someone gets a red chase ring, dodge (catch = short stun).\n4) Press E on green task dots or Short task for bonus evidence; then End explore to accuse the phantom.',
      controlsHint: 'Controls: WASD move, mouse aim flashlight, E/Space interact, Esc pause.',
      pause: 'Paused',
      resume: 'Resume',
      resumeHint: 'Resume starts a countdown. Esc pauses.',
      landscapeHint: 'Landscape recommended (portrait remains playable).',
      interact: 'Interact',
      interactDoor: '[E] Open/close door & read door log',
      interactDoorOpened: 'Door opened',
      interactDoorClosed: 'Door closed',
      interactTask: '[E] Inspect task point',
      interactTaskHint: 'Task point — press Short task (top-right) to play a mini-game',
      interactGateOk: '[E] Inspect gate (you can pass)',
      interactGateBlocked: '[E] Inspect gate (blocked for you)',
      interactScanner: '[E] Read scanner evidence',
      interactReview: '[E] Review room',
      interactReviewHint: 'Review room — press End explore when you have enough evidence',
      interactNone: 'Nothing nearby. Head to the cyan SCAN marker first.',
      interactGotEvidence: 'Evidence collected!',
      interactGotEvidenceCount: 'Collected {n} evidence item(s)!',
      interactNoNewEvidence: 'No new evidence here (maybe already read).',
      aimPad: 'AIM',
      nextStep: 'Next',
      step1: 'Go to cyan SCAN marker, press E',
      step2: 'Press E near brown doors for door logs',
      step3: 'Dodge the red-ring pursuer; explore rooms and green task dots',
      step4: 'Press End explore to guess NPC identities & phantom',
      nextHintScanner: 'Walk to the cyan SCAN marker and press E.',
      nextHintDoor: 'Find a brown door, walk close, press E.',
      nextHintExplore: 'Keep exploring gates and green task dots, or run a Short task.',
      nextHintReview: 'You have enough clues — press End explore to guess.',
      mapLegend: 'Markers: cyan diamond = scanner, brown = door, green = task, red ring = chasing you. Rooms have different floor patterns. Outside the flashlight is dark.',
      room: 'Current room',
      roleLabel: 'Your identity',
      seedLabel: 'Case seed',
      start: 'Start case',
      replay: 'Replay last seed',
      tutorial: 'Tutorial',
      skipTutorial: 'Skip tutorial',
      next: 'Next',
      science: 'Science card',
      scienceTitle: 'Combinatorial odor signatures (simplified)',
      scienceBody:
        'This is a simplified combinatorial odor-signature game. Gates A-F are fictional tokens, not wet-lab receptor affinities. Matching three gates identifies an odor identity for deduction practice only.',
      bestLabel: 'Best score',
      briefing: 'Briefing',
      briefingLead:
        'You have one odor identity (opens matching A-F gates). Four NPCs each have different identities; one is the phantom (can sneak through illegal gates and leave traces).',
      briefingPhantomHint:
        'Wiki solo: the phantom is never you. While collecting evidence, dodge the pursuer (red ring); getting caught briefly stuns you. Then guess identities + phantom on the board.',
      beginExplore: 'Enter the labyrinth',
      startTask: 'Short task',
      roomEnter: 'Entering: {room}',
      threatChase: 'Someone is chasing you — dodge!',
      threatCaught: 'Caught! Briefly stunned — run!',
      interactTaskStart: 'Short task started (finish for bonus evidence)',
      taskPatternTitle: 'Pattern match',
      taskPatternHow: 'Pick the option that exactly matches the target signature.',
      taskPatternTarget: 'Target',
      taskPatternHint: 'Choose the matching signature',
      taskRoutingTitle: 'Signal routing',
      taskRoutingHow: 'Press buttons in order: 1 → 2 → 3 → 4. Wrong taps do not advance.',
      taskRoutingOrder: 'Order: 1 → 2 → 3 → 4',
      taskRoutingProgress: 'Next expected: {cur} / {total}',
      taskHoldTitle: 'Calibration hold',
      taskHoldHow: 'Hold the button (or Space) until the progress fills.',
      taskHoldTip: 'Keep holding; releasing resets progress',
      taskHoldProgress: 'Calibration {pct}%',
      taskMemoryTitle: 'Memory order',
      taskMemoryHow: 'Memorize the number sequence, then tap it in order after it hides.',
      taskMemoryWatch: 'Memorize this sequence…',
      taskMemoryInput: 'Entered {n} / {total}',
      taskTimer: '{s}s left',
      taskWrong: 'Not quite — try again.',
      taskOk: 'Short task complete! Evidence gained.',
      advancePhase: 'End explore, go to review',
      evidenceCount: 'Evidence found',
      solutionUnique: 'With current evidence, only one solution remains.',
      solutionMultiple:
        'Multiple possibilities remain ({n}). No unique answer yet \u2014 keep collecting evidence.',
      review: 'Review',
      verdict: 'Final verdict',
      evidence: 'Evidence',
      statements: 'NPC statements (true but incomplete)',
      board: 'Deduction board',
      boardHint: 'Use the dropdowns (keyboard OK) to assign each NPC an odor, then pick the phantom.',
      pickPhantom: 'Accuse phantom NPC',
      continue: 'Continue',
      submitVerdict: 'Submit verdict',
      noEvidence: 'No evidence yet.',
      debrief: 'Debrief',
      phantom: 'phantom',
      truth: 'Truth',
      guess: 'Your guess',
      scoreCase: 'Case solved',
      scoreOdor: 'Odor assignments',
      scoreEvidence: 'Evidence found',
      scoreTime: 'Time',
      scoreTotal: 'Total',
      backMenu: 'Back to menu',
      taskPattern: 'Pattern pair: choose the matching signature (keys 1-3).',
      taskRouting: 'Signal routing: press nodes in order 1-4.',
      taskHold: 'Calibration hold: hold Space / button.',
      taskHoldBtn: 'Hold',
      taskMemory: 'Memory order: watch, then enter the sequence.',
      taskAbort: 'Abort task',
      tutorial_move: 'Move with WASD or arrows. On touch, use the left joystick.',
      tutorial_flashlight: 'Aim the flashlight with the mouse or aim pad. Walls block light.',
      tutorial_gates: 'Gates A-F only open for matching odor identities (letter + shape).',
      tutorial_artifact: 'Phantom phaseShift through illegal gates leaves a scannable artifact.',
      tutorial_doorLog: 'Press E near doors/scanner to read door logs and channel clues.',
      tutorial_board: 'In review, assign each NPC an odor and pick the phantom on the board.',
      stmt_saw_gate: '{npc} reports using gate {gate}.',
      stmt_worked_task: '{npc} reports working near {task}.',
      stmt_heard_door: '{npc} heard a door change.',
      stmt_no_artifact: '{npc} says they left no artifact traces.',
      stmt_visited_central: '{npc} was seen in the central corridor.',
      exploreGoal: 'Goal: collect evidence → End explore → guess NPC odors & the phantom.',
    },
    spectrumShell: {
      guide: 'How to play',
    },
    spectrum: {
      lead: 'Infer mixture sources and integer ratios from a 12-channel virtual-receptor signal (illustrative model).',
      chooseRun: 'Choose a run',
      science: '30-second science',
      scienceTitle: 'Mixtures may show antagonism / enhancement',
      scienceBody:
        'Real mixtures can show antagonism or enhancement, so this game\u2019s linear/saturation model is a simplified illustration. Solving a puzzle is not measuring real gas concentrations, and signal fit is not chemical identification confidence.',
      contrastOn: 'High contrast: on',
      contrastOff: 'High contrast: off',
      close: 'Close',
      guideTitle: 'How to play',
      guide1: 'Read the target 12-channel signal (dots/bars + polyline).',
      guide2: 'Set each odor percent in the pool (sum=100). 0% means that odor is unused.',
      guide3: 'Each submit shows nA mB and signal fit. A = exact % on a participating odor; B = selected but wrong %. Perfect = kA0B (k = truth component count).',
      axisNote:
        'X-axis is Virtual receptor/channel; Y-axis is Relative response. The polyline aids reading \u2014 it is not a time wave.',
      practice: 'Practice',
      daily: 'Daily challenge',
      settings: 'Settings',
      difficulty: 'Difficulty',
      diffEasy: 'Easy',
      diffHard: 'Hard',
      diffEasyHint: 'Easy: 6 odors, signature sketches, mix-count reveal, and shrinking candidates.',
      diffHardHint: 'Hard: 10 odors with signature sketches, but no mix-count reveal.',
      seed: 'Seed',
      randomizeSeed: 'Randomize seed',
      dailyNote:
        'Daily challenge uses a UTC date seed. This is a local challenge, not an anti-cheat world leaderboard.',
      best: 'Local best',
      scoreScope: 'Compare only within the same difficulty and rule version',
      reducedMotion: 'Reduced motion',
      clearData: 'Clear local data',
      replayTutorial: 'Replay tutorial',
      readyLead: 'Pick mode and difficulty, then start. The UI never reimplements A/B or scoring.',
      factOdors: 'Odors',
      factComponents: 'Components',
      factStep: 'Ratio step',
      factGuesses: 'Guesses',
      factModel: 'Mixing model',
      startPractice: 'Start practice',
      startDaily: 'Start daily challenge',
      tutorial: 'Tutorial',
      skipTutorial: 'Skip tutorial',
      next: 'Next',
      back: 'Back',
      startPlay: 'Start decoding',
      tut1Title: 'Single-source pattern',
      tut1Body: 'Each odor has an illustrative signature across 12 virtual receptor channels.',
      tut2Title: 'Mixed signal',
      tut2Body: 'Weighted ratios (optionally saturated) form the target response curve.',
      tut3Title: 'Infer sources and ratios',
      tut3Body: 'Use A/B feedback and signal fit to narrow candidates.',
      xAxis: 'Virtual receptor/channel',
      yAxis: 'Relative response',
      chartAria: '12 channel response chart',
      remaining: 'Guesses left',
      targetSignal: 'Target signal',
      builder: 'Guess builder',
      poolSelect: 'Adjust each odor percent (0% = unused)',
      mixCountReveal: 'Odors in the truth mix',
      signatureHint: 'Signature sketch',
      candidatesLeft: 'Mixtures left',
      candidateOdors: 'Possible odors',
      componentCount: 'Components',
      odor: 'Odor',
      percent: 'Percent',
      sum: 'Sum',
      sumNeed100: 'Must equal 100 to submit',
      autofill: 'Auto-fill remaining ratio',
      autofillOk: 'Adjusted {odor} from {from}% to {to}% so the sum equals 100.',
      autofillFail: 'Cannot fill a legal remainder without changing other slots.',
      submit: 'Submit guess',
      signalFit: 'Signal fit',
      abBlind: 'A = exact % on a participating odor; B = selected but wrong %. Non-participating odors ignored. Perfect = kA0B.',
      targetCurve: 'Target curve',
      guessCurve: 'Guess curve',
      residual: 'Residual',
      history: 'History',
      guess: 'Guess',
      noHistory: 'No guesses yet',
      solved: 'Decoded!',
      failed: 'Out of guesses \u2014 revealing truth',
      truth: 'Truth',
      guessScore: 'Guess score',
      timeScore: 'Time score',
      totalScore: 'Total',
      elapsed: 'Elapsed',
      guessesUsed: 'Guesses used',
      channelContribution: 'Per-channel contribution (linear)',
      satCompare: 'Before / after saturation',
      linear: 'Linear',
      saturated: 'Saturated',
      observed: 'Observed',
      noiseDisclaimer:
        'Expert seeded noise is a game-rule dispersion \u2014 not real chemical or sensor noise.',
      playAgain: 'Play again',
      backSetup: 'Back to setup',
    },
    pages: {
      navTeam: 'Team',
      navAttributions: 'Attributions',
      navHumanPractices: 'Human Practices',
      navEducation: 'Education',
      team: {
        title: 'Team',
        lead: 'Member records are team-supplied. No roster is shown until verified data is added.',
        empty: 'No verified team roster has been entered yet.',
        emptyHint:
          'Fill the team catalog with name, role, subteam, contribution, portrait fields. Do not treat proposal authors as the final roster automatically.',
        contact: 'Contact',
        subteams: {
          'wet-lab': 'Wet Lab',
          'dry-lab': 'Dry Lab',
          hardware: 'Hardware',
          'human-practices': 'Human Practices',
          wiki: 'Wiki',
          advisors: 'Advisors',
          other: 'Other',
        },
        contribution: 'Contribution summary',
        portraitPending: 'Portrait pending',
      },
      attributions: {
        title: 'Attributions',
        lead: 'Official iGEM attributions embed. The URL must be confirmed by the team in site.json.',
        embedMissing: 'attributionsEmbedUrl is not set.',
        embedMissingHint:
          'Add the team-confirmed igem.org / igem.wiki official URL in apps/wiki-client/site.json. While empty, this page issues no network request.',
        embedInvalid: 'attributionsEmbedUrl is not a valid URL.',
        embedBlocked: 'URL hostname is not allowlisted (igem.org / igem.wiki only).',
        iframeTitle: 'Official iGEM attributions',
        openOfficial: 'Open official attributions in a new page',
        iframeFallback:
          'If the iframe cannot load, use the link above to open official attributions in a new page.',
        supportTitle: 'Additional acknowledgements',
        supportEmpty:
          'No team-supplied support acknowledgement text yet (must not contradict official attributions).',
      },
      humanPractices: {
        title: 'Human Practices',
        lead: 'Integration Loop: question \u2192 hearing \u2192 insight \u2192 decision \u2192 change \u2192 evidence \u2192 follow-up. Real notes and consented quotes only.',
        empty: 'No verified engagement or stakeholder records have been entered yet.',
        sections: {
          approach: 'Our approach',
          landscape: 'Stakeholder landscape',
          needFinding: 'Need finding',
          decisions: 'Integrated decisions',
          ethics: 'Ethics and responsibility',
          changed: 'How Human Practices changed Wet Lab / Model / Hardware',
          limitations: 'Limitations and missing voices',
          next: 'Next steps',
        },
        loopLabels: {
          question: 'Question asked',
          heard: 'What we heard',
          insight: 'Insight',
          decision: 'Project decision',
          change: 'Concrete change',
          evidence: 'Evidence of change',
          followUp: 'Follow-up / evaluation',
          impact: 'Project impact',
        },
        noStakeholders: 'No stakeholder map data yet.',
        noEngagements: 'No engagement records yet.',
        noDecisions: 'No decision timeline yet.',
        anonymized: 'Anonymized (reason on record)',
      },
      education: {
        title: 'Education',
        lead: 'Each activity needs objectives, evaluation, and post-feedback changes. Do not invent student quotes or outcome percentages.',
        empty: 'No education activity records have been entered yet.',
        status: {
          planned: 'Planned',
          'in-progress': 'In progress',
          completed: 'Completed',
        },
        fields: {
          audience: 'Audience and needs',
          objectives: 'Learning objectives',
          codesign: 'Co-design / adaptation',
          materials: 'Materials',
          activity: 'Activity',
          safety: 'Safety / inclusivity / accessibility',
          evaluation: 'Evaluation method',
          results: 'Results',
          changed: 'What changed after feedback',
          downloads: 'Reusable downloads',
          license: 'License',
        },
        noResultsYet: 'No team-supplied evaluation results yet (planned / in-progress).',
        downloads: 'Reusable downloads',
      },
    },
  },
};

export function t(locale: Locale): MessageTree {
  return messages[locale];
}
