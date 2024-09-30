import { useSessionService } from "@/services/useSessionService";
import { useUserService } from "@/services/useUserService";
import { Button, Menu, MenuItem } from "@mui/material";

const Header = () => {
  const { data } = useUserService();
  const { Logout } = useSessionService();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMenuOpened = Boolean(anchorEl);

  return (
    <header className="bg-gray-100 h-[70px]">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <p className="text-xl font-bold">
          <span className="text-orange-main">Book</span> Shelf
        </p>
        <div>
          <Button
            type="button"
            onClick={handleClick}
            aria-controls={isMenuOpened ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpened ? "true" : undefined}
            id="basic-button"
            className="!text-black-main !border !border-black"
          >
            {data?.data?.name}
          </Button>
          <Menu
            open={isMenuOpened}
            anchorEl={anchorEl}
            onClose={handleClose}
            id="basic-menu"
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
