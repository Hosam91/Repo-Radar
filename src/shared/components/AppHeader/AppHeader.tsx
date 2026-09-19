import {
  BrandSection,
  HeaderContent,
  HeaderIcon,
  HeaderRoot,
  HeaderSubtitle,
  HeaderTextGroup,
  HeaderTitle,
} from "./AppHeader.styles";

export function AppHeader() {
  return (
    <HeaderRoot component="header">
      <HeaderContent maxWidth="lg">
        <BrandSection>
          <HeaderIcon aria-hidden="true" focusable="false" />

          <HeaderTextGroup>
            <HeaderTitle component="h1" variant="h5">
              Repo Radar
            </HeaderTitle>

            <HeaderSubtitle variant="body2" color="text.secondary">
              Search, track, and monitor GitHub repositories.
            </HeaderSubtitle>
          </HeaderTextGroup>
        </BrandSection>
      </HeaderContent>
    </HeaderRoot>
  );
}
