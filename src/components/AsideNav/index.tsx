import { Box, Stack } from "@mui/system";
import { NavigationOption } from "@/utils/consts";
import AsideNavItem from "@/components/AsideNav/AsideNavItem";

interface Props {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

function AsideNav(props: Props) {
  const options = Object.entries(NavigationOption);
  // Get the index of the selected item
  const selectedIndex = options.findIndex(
    ([, item]) => item.title === props.selectedOption
  );

  const gapPx = 4;
  const gapVh = (gapPx / window.innerHeight) * 100;

  return (
    <aside>
      <Box
        className="default-shadow bg-white min-h-[93vh] min-w-[15vw] max-w-[15vw]"
      >
        <Stack
          direction="column"
          spacing={0.5}
          sx={{ paddingLeft: "5px", "*": { zIndex: 2 } }}
        >
          {Object.entries(NavigationOption).map(([key, item]) => (
            <AsideNavItem
              key={key}
              id={item.id}
              icon={item.icon}
              title={item.title}
              selected={props.selectedOption === item.title}
              onSwitch={props.setSelectedOption}
            ></AsideNavItem>
          ))}
          <span
            className="glider"
            style={{
              transform: `translateY(calc(${selectedIndex} * (6vh + ${gapVh}vh)))`,
            }}
          ></span>
        </Stack>
      </Box>
    </aside>
  );
}

export default AsideNav;
