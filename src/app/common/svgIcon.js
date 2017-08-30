var icons = {
  deployments: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"> <path fill="#F1F6F7" fill-rule="evenodd" d="M1.85 10.458c-1.481-.74-1.437-1.84.098-2.453l17.299-6.92c1.535-.614 2.282.134 1.668 1.669l-6.92 17.298c-.614 1.536-1.71 1.585-2.453.099l-1.89-3.78c-.74-1.482-2.536-3.28-4.022-4.023l-3.78-1.89z"/> </svg>',
  gateways: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <g fill="#F1F6F7" fill-rule="evenodd"> <rect width="8" height="6" x="6" rx="1"/><rect width="8" height="6" x="1" y="14" rx="1"/><rect width="8" height="6" x="11" y="14" rx="1"/><path d="M0 9h20v2H0zM14 11h2v3h-2zM9 6h2v3H9zM4 11h2v3H4z"/> </g></svg>',
  workflows: '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14"><path fill="none" fill-rule="evenodd" stroke="#F1F6F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 7.47l1.454-.885C3.4 6.01 4.64 4.783 5.22 3.853L6.803 1.32c.293-.469.636-.416.768.128l2.691 11.046c.131.54.4.57.607.044l2.428-6.134A1.02 1.02 0 0 1 14.6 5.82l.355.132c1.037.388 2.744.925 3.812 1.2L20 7.47"/></svg>',
  blueprints: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20"><g fill="#F1F6F7" fill-rule="evenodd" transform="scale(1 -1) rotate(45 34.678 3.222)"><circle cx="11.5" cy="15.5" r="2.5"/><circle cx="3" cy="16" r="3"/><circle cx="11.5" cy="2.5" r="2.5"/><circle cx="2.5" cy="6.5" r="2.5"/><path fill-rule="nonzero" d="M3 13.401a8.843 8.843 0 0 1 1.949-2.585c3.395-3.108 8.821-3.347 12.65-.876l-.2-.872a.823.823 0 0 1 .14-.666.976.976 0 0 1 .614-.382c.252-.05.516-.006.733.122a.89.89 0 0 1 .422.56l.674 2.965c.103.48-.238.945-.762 1.04l-3.247.615c-.34.064-.69-.042-.921-.278a.83.83 0 0 1-.197-.868.945.945 0 0 1 .724-.59l.955-.181c-3.07-2.025-7.467-1.86-10.211.668C5.71 12.634 4.83 14 4.83 14s-1.873-.599-1.83-.599z"/></g></svg>',
  breeds: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19" height="19" viewBox="0 0 19 19"><defs><path id="a" d="M0 0h20v20H0z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><circle cx="2.5" cy="9.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="9.5" cy="16.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="16.5" cy="2.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="16.5" cy="9.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="9.5" cy="2.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="2.5" cy="16.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/><circle cx="9.5" cy="9.5" r="2.5" fill="#F1F6F7" mask="url(#b)"/></g></svg>',
  scales: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="#F1F6F7" fill-rule="evenodd"><rect width="15" height="15" x="5" rx="1"/><path d="M3 10H.995c-.54 0-.995.446-.995.995v8.01c0 .54.446.995.995.995h8.01c.54 0 .995-.446.995-.995V17H4c-.552 0-1-.445-1-1v-6z"/></g></svg>',
  conditions: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><g fill="#F1F6F7" fill-rule="evenodd"><rect width="20" height="4" rx="1"/><rect width="10" height="2" x="5" y="15" rx="1"/><rect width="14" height="3" x="3" y="8" rx="1"/></g></svg>',
  admin: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#F1F6F7" fill-rule="evenodd" d="M17.372 8.077h1.943c.378 0 .685.306.685.685v2.476a.685.685 0 0 1-.685.685h-1.943c-1.007 0-1.512 1.218-.8 1.93l1.375 1.374a.684.684 0 0 1 0 .968l-1.752 1.752a.684.684 0 0 1-.968 0l-1.374-1.374c-.712-.713-1.93-.208-1.93.8v1.942a.685.685 0 0 1-.685.685H8.762a.685.685 0 0 1-.685-.685v-1.943c0-1.007-1.218-1.512-1.93-.8l-1.374 1.375a.684.684 0 0 1-.968 0l-1.752-1.752a.684.684 0 0 1 0-.968l1.374-1.374c.713-.712.208-1.93-.8-1.93H.686A.685.685 0 0 1 0 11.238V8.762c0-.379.307-.685.685-.685h1.943c1.007 0 1.512-1.218.8-1.93L2.052 4.773a.685.685 0 0 1 0-.969l1.752-1.75a.684.684 0 0 1 .968 0l1.374 1.373c.712.712 1.93.208 1.93-.8V.686c0-.378.306-.685.685-.685h2.476c.379 0 .685.307.685.685v1.943c0 1.007 1.218 1.511 1.93.799l1.374-1.374a.684.684 0 0 1 .968 0l1.752 1.751a.685.685 0 0 1 0 .97l-1.374 1.373c-.713.712-.208 1.93.8 1.93zm-4.218 2a3.077 3.077 0 1 0-6.154 0 3.077 3.077 0 0 0 6.154 0z"/></svg>',
  nav_expand: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#F1F6F7" fill-rule="evenodd" d="M13.95 10.707l.707-.707L9 4.343 7.586 5.757 11.828 10l-4.242 4.243L9 15.657l4.95-4.95zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"/></svg>',
  nav_collapse: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#F1F6F7" fill-rule="evenodd" d="M6.05 10.707L5.343 10 11 4.343l1.414 1.414L8.172 10l4.242 4.243L11 15.657l-4.95-4.95zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="#7F8FA4" fill-rule="nonzero"><path d="M11.66.867l-1.062 1.06-9.284 9.284 2.475 2.474L14.154 3.322l.334-.335c.33-.33.512-.77.512-1.237 0-.468-.182-.907-.512-1.237A1.74 1.74 0 0 0 13.25 0a1.74 1.74 0 0 0-1.238.513l-.353.353zM1.028 11.632L.016 14.667a.25.25 0 0 0 .317.316l3.035-1.011-2.34-2.34"/></g></svg>',
  remove: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15"><path fill="#7F8FA4" fill-rule="nonzero" d="M11.75 1.525H8.239c-.028-.317-.124-.853-.453-1.197A1.049 1.049 0 0 0 7 0H4.5c-.313 0-.578.11-.786.328-.33.344-.426.88-.453 1.197H.25A.252.252 0 0 0 0 1.78c0 .14.112.254.25.254h.51l.479 11.7c.01.438.277 1.266 1.227 1.266h7.068c.95 0 1.218-.828 1.227-1.26l.479-11.706h.51c.138 0 .25-.114.25-.254a.252.252 0 0 0-.25-.255zm-8 11.187c0 .14-.112.254-.25.254a.252.252 0 0 1-.25-.254v-8.39c0-.14.112-.254.25-.254s.25.113.25.254v8.39zm2.5 0c0 .14-.112.254-.25.254a.252.252 0 0 1-.25-.254v-8.39c0-.14.112-.254.25-.254s.25.113.25.254v8.39zm2.5 0c0 .14-.112.254-.25.254a.252.252 0 0 1-.25-.254v-8.39c0-.14.112-.254.25-.254s.25.113.25.254v8.39zM4.073.682A.56.56 0 0 1 4.5.508H7c.175 0 .315.057.427.174.201.209.282.577.31.843H3.763c.028-.266.109-.634.31-.843z"/></svg>',
  deploy_as: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="#7F8FA4" fill-rule="evenodd" d="M12 9h2v1h-2v2h-1v-2H9V9h2V7h1v2zm-2 2v2h.262l-.233.582c-.616 1.542-1.714 1.598-2.462.102l-.738-1.477c-.743-1.486-2.54-3.288-4.036-4.036l-1.476-.738C-.17 6.69-.127 5.59 1.419 4.971L12.977.347c1.543-.617 2.294.13 1.676 1.676L13 6.155V6h-3v2H8v3h2z"/></svg>',
  merge_to: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="#7F8FA4" fill-rule="evenodd"><path d="M9 5V0H0v9h5V5h4z"/><path d="M6 6h9v9H6z"/></g></svg>',
  remove_from: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="#7F8FA4" fill-rule="evenodd"><path d="M3 3h12v12H3V3zm1 1v10h10V4H4z"/><path d="M13 2V0H0v13h2V2h11z"/><path d="M6 8h6v2H6z"/></g></svg>',
  suspend: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="#7F8FA4" fill-rule="evenodd" d="M7.5 15C3.364 15 0 11.636 0 7.5S3.364 0 7.5 0 15 3.364 15 7.5 11.636 15 7.5 15zM1.25 7.5a6.257 6.257 0 0 0 6.25 6.25 6.221 6.221 0 0 0 3.953-1.414l-8.79-8.79A6.221 6.221 0 0 0 1.25 7.5zM7.5 1.25a6.22 6.22 0 0 0-3.953 1.413l8.79 8.79A6.221 6.221 0 0 0 13.75 7.5 6.257 6.257 0 0 0 7.5 1.25z"/></svg>',
  start: '<svg width="9px" height="15px" viewBox="0 0 9 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-859.000000, -478.000000)" id="Start" fill="#7F8FA4"><g transform="translate(856.000000, 478.000000)"><polygon id="start" points="3 0 12 7.5 3 15"></polygon></g></g></g></svg>',
  restart: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15"><path fill="#7F8FA4" fill-rule="evenodd" d="M13 8.417C13 12.047 10.084 15 6.5 15S0 12.047 0 8.417c0-.346.276-.625.617-.625.34 0 .617.28.617.625 0 2.94 2.362 5.333 5.266 5.333s5.266-2.392 5.266-5.333c0-2.913-2.356-5.282-5.253-5.282h-.081l.787.798a.63.63 0 0 1 0 .884.61.61 0 0 1-.872 0L4.496 2.942a.63.63 0 0 1 0-.884L6.346.183a.612.612 0 0 1 .873 0 .63.63 0 0 1 0 .884l-.807.818h.101c3.578 0 6.487 2.93 6.487 6.532z"/></svg>',
  export_as_blueprint: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="#7F8FA4" fill-rule="nonzero" d="M15 6.838L8.604 0v4.088h-.086c-3.589 0-5.279 1.639-5.336 1.697C-.768 9.28.072 14.169.08 14.218L.224 15l.383-.684c2.36-4.218 5.474-4.848 7.12-4.848.385 0 .688.035.877.065v4.143L15 6.838"/></svg>'
};

angular.module('vamp-ui').directive('svgicon', function () {
  function link(scope, element, attrs) {
    function renderSVG() {
      element.html(icons[attrs.type]);
    }
    renderSVG();
  }

  return {
    link: link,
    restrict: 'E'
  };
});
