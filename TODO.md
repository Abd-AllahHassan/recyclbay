# TODO: Fix Main Store Navbar Mobile Width Overflow

## Tasks
- [ ] Constrain logo image width on mobile in Header.jsx (max-w-[120px] md:max-w-none)
- [ ] Adjust mobile menu width to w-full max-w-sm to fit viewport
- [ ] Add overflow-x-hidden to header className for mobile clipping
- [ ] Implement body scroll lock with useEffect when mobile menu is open
- [ ] Remove redundant display style on mobile menu (use variants for visibility)
- [ ] Test navbar on mobile: Launch browser to homepage, verify no horizontal scroll, logo fits, menu opens without overflow
- [ ] If issues persist, check and edit src/index.css for global overflow rules
- [ ] Mark this section as completed once verified
