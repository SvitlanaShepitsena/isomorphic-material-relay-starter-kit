export default function dateFromUTCString( s )
{
  s = s.split(/[\D]/ig);
  return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5], s[6]||0));
}
