import { Badge } from "primereact/badge";

const MenuItemTemplate = (item) => (
    <div className='p-menuitem-content '>
        {!item?.disable &&
        <a className={`flex align-items-center rounded custom  p-menuitem-link ${item.active ? 'active': ''} ${item.separator ? 'px-0 pt-0': 'py-2'}`} onClick={item.command}>
            {item.separator && <span className="bg-secondary w-100" style={{height: "1px"}}></span>}
            {item.icon && <span className={item.icon} />}
            {item.label &&  <span className="mx-2">{item.label}</span>}
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.notifBadge && <Badge className="ml-auto" severity="danger" />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>}
    </div>
);
export default MenuItemTemplate;