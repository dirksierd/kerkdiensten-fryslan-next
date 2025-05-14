type KFEventKind = "morning";
type KFEventLanguage = "fy" | "nl";

type KFEventDb = {
  id: string;
  startingAt: number;
  endingAt: number;
  location: string;
  kind: KFEventKind;
  description: string;
  hasHolySupper: 1 | 0;
  language: KFEventLanguage;
  isSpecial: 1 | 0;
};

type KFEvent = Omit<KFEventDb, "isSpecial" | "hasHolySupper" | "location"> & {
  isSpecial: boolean;
  hasHolySupper: boolean;
  location: {
    title: string;
  };
};
