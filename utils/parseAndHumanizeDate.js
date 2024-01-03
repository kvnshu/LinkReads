import { formatDistanceToNow, parseISO } from "date-fns";

export function parseAndHumanizeDate(dateString) {
  if (!dateString){
    return;
  }
  const parsedDate = parseISO(dateString);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}