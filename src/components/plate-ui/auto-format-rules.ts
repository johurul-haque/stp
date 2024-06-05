import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat';

import { autoformatBlocks } from '@/lib/plate/autoformatBlocks';
import { autoformatIndentLists } from '@/lib/plate/autoformatIndentLists';
import { autoformatMarks } from '@/lib/plate/autoformatMarks';

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatIndentLists,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
];
